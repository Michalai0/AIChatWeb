import { useState, useEffect } from "react";

import styles from "./profile.module.scss";

import CloseIcon from "../icons/close.svg";
import { Input, List, ListItem, Modal, PasswordInput } from "./ui-lib";

import { IconButton } from "./button";
import {
  useAuthStore,
  useAccessStore,
  useAppConfig,
  useProfileStore,
  useWebsiteConfigStore,
} from "../store";

import { copyToClipboard } from "../utils";

import Locale from "../locales";
import { Path } from "../constant";
import { ErrorBoundary } from "./error";
import { useNavigate } from "react-router-dom";
import { showToast, Popover } from "./ui-lib";
import { Avatar, AvatarPicker } from "./emoji";
import { Balance } from "../api/users/[...path]/route";

export function Profile() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const accessStore = useAccessStore();
  const profileStore = useProfileStore();
  const { registerTypes } = useWebsiteConfigStore();
  const registerType = registerTypes[0];
  const REG_TYPE_USERNAME_AND_EMAIL_WITH_CAPTCHA_AND_CODE =
    "UsernameAndEmailWithCaptchaAndCode";

  const config = useAppConfig();
  const updateConfig = config.update;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(Path.Home);
      }
    };
    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { fetchProfile } = profileStore;
  useEffect(() => {
    setLoading(true);
    fetchProfile(authStore.token, authStore)
      .then((res) => {
        if (!res?.data || !res?.data?.id) {
          authStore.logout();
          navigate(Path.Login);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchProfile, navigate]);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function logout() {
    setTimeout(() => {
      authStore.logout();
      navigate(Path.Login);
    }, 500);
  }

  function createInviteCode() {
    setLoading(true);
    profileStore
      .createInviteCode(authStore)
      .then((resp) => {
        console.log("resp", resp);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getPrefix(balance: Balance) {
    return balance.calcType == "Total"
      ? Locale.Profile.ExpireList.Total
      : balance.calcType == "Daily"
        ? Locale.Profile.BalanceItem.CalcTypes.Daily
        : balance.calcType == "Hourly"
          ? Locale.Profile.BalanceItem.CalcTypes.Hourly
          : balance.calcType == "ThreeHourly"
            ? Locale.Profile.BalanceItem.CalcTypes.ThreeHourly
            : "";
  }

  return (
    <ErrorBoundary>
      <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">{Locale.Profile.Title}</div>
          <div className="window-header-sub-title">
            {/* {Locale.Profile.SubTitle} */}
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
              title={Locale.Profile.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["profile"]}>
        <List>
          <ListItem title={Locale.Settings.Avatar}>
            <Popover
              onClose={() => setShowEmojiPicker(false)}
              content={
                <AvatarPicker
                  onEmojiClick={(avatar: string) => {
                    updateConfig((config) => (config.avatar = avatar));
                    setShowEmojiPicker(false);
                  }}
                />
              }
              open={showEmojiPicker}
            >
              <div
                className={styles.avatar}
                onClick={() => setShowEmojiPicker(true)}
              >
                <Avatar avatar={config.avatar} />
              </div>
            </Popover>
          </ListItem>

          <ListItem title={Locale.Profile.Username}>
            <span>{authStore.username}</span>
          </ListItem>

          {authStore.phone ? (
            <ListItem title={Locale.Profile.Phone}>
              <span>{authStore.phone}</span>
            </ListItem>
          ) : (
            <></>
          )}

          {registerType == REG_TYPE_USERNAME_AND_EMAIL_WITH_CAPTCHA_AND_CODE ? (
            <ListItem title={Locale.Profile.Email}>
              <span>{authStore.email}</span>
            </ListItem>
          ) : (
            <></>
          )}
        </List>

        <List>
          {profileStore.invitorId ? (
            <ListItem title={Locale.Profile.Invitor.Title}>
              <span>#{profileStore.invitorId}</span>
            </ListItem>
          ) : (
            <></>
          )}
          <ListItem title={Locale.Profile.InviteCode.Title}>
            {authStore.inviteCode ? (
              <>
                <IconButton
                  //className={"copy-action"}
                  onClick={() => {
                    copyToClipboard(authStore.inviteCode);
                  }}
                  text={authStore.inviteCode}
                  type="second"
                />
                <IconButton
                  text={Locale.Profile.Actions.Copy}
                  //className={"copy-action"}
                  onClick={() => {
                    copyToClipboard(
                      location.origin +
                        Path.Register +
                        "?code=" +
                        authStore.inviteCode,
                    );
                  }}
                  type="second"
                />
              </>
            ) : (
              <IconButton
                text={Locale.Profile.Actions.CreateInviteCode}
                type="second"
                disabled={loading}
                onClick={() => {
                  createInviteCode();
                }}
              />
            )}
          </ListItem>
          <ListItem
            title={Locale.Profile.InviteCode.RecordTitle}
            subTitle={Locale.Profile.InviteCode.RecordSubTitle}
          >
            <IconButton
              type="second"
              text={Locale.Profile.Invitor.Record}
              onClick={() => navigate(Path.Invitation)}
            />
          </ListItem>
        </List>

        <List>
          {loading ||
          (profileStore.balances && profileStore.balances.length === 0) ? (
            <div
              style={{
                borderBottom: "var(--border-in-light)",
                minHeight: "40px",
                lineHeight: "40px",
                padding: "10px 20px",
                textAlign: "center",
              }}
            >
              {loading
                ? Locale.Profile.Loading
                : profileStore.balances && profileStore.balances.length === 0
                  ? Locale.Profile.EmptyOrder
                  : ""}
            </div>
          ) : (
            <></>
          )}

          {profileStore.balances &&
          profileStore.balances.length > 0 &&
          !profileStore.balances[0].expired ? (
            <>
              {/*              <ListItem
                title={Locale.Profile.Tokens.Title}
                subTitle={
                  getPrefix(profileStore.balances[0]) +
                  Locale.Profile.Tokens.SubTitle
                }
              >
                <span>
                  {profileStore.balances[0].tokens == -1
                    ? Locale.Balance.unlimited
                    : profileStore.balances[0].tokens}
                </span>
              </ListItem>*/}

              <ListItem
                title={Locale.Profile.ChatCount.Title}
                subTitle={
                  getPrefix(profileStore.balances[0]) +
                  Locale.Profile.ChatCount.SubTitle
                }
              >
                <span>
                  {profileStore.balances[0].chatCount == -1
                    ? Locale.Balance.unlimited
                    : profileStore.balances[0].chatCount}
                </span>
              </ListItem>

              <ListItem
                title={Locale.Profile.AdvanceChatCount.Title}
                subTitle={
                  getPrefix(profileStore.balances[0]) +
                  Locale.Profile.AdvanceChatCount.SubTitle
                }
              >
                <span>
                  {profileStore.balances[0].advancedChatCount == -1
                    ? Locale.Balance.unlimited
                    : profileStore.balances[0].advancedChatCount}
                </span>
              </ListItem>
              <ListItem
                title={Locale.Profile.DrawCount.Title}
                subTitle={
                  getPrefix(profileStore.balances[0]) +
                  Locale.Profile.DrawCount.SubTitle
                }
              >
                <span>
                  {profileStore.balances[0].drawCount == -1
                    ? Locale.Balance.unlimited
                    : profileStore.balances[0].drawCount}
                </span>
              </ListItem>
              <ListItem
                title={Locale.Profile.ExpireList.Title}
                subTitle={Locale.Profile.ExpireList.SubTitle}
              >
                <span>{profileStore.balances[0].expireTime}</span>
              </ListItem>
            </>
          ) : (
            <></>
          )}
          {profileStore.balances && profileStore.balances.length > 0 ? (
            <ListItem
              subTitle={
                profileStore.balances[0].expired
                  ? Locale.Profile.InvalidOrder
                  : Locale.Profile.EarliestDueOrder
              }
            >
              <IconButton
                text={Locale.Profile.Actions.All}
                type="second"
                style={{ flexShrink: 0 }}
                onClick={() => {
                  // showToast(Locale.Profile.Actions.ConsultAdministrator);
                  navigate(Path.Balance);
                }}
              />
            </ListItem>
          ) : (
            <></>
          )}

          <ListItem title={Locale.Profile.Actions.BalanceLog}>
            <IconButton
              text={Locale.Profile.Actions.BalanceLog}
              type="second"
              onClick={() => {
                navigate(Path.BalanceLog);
              }}
            />
          </ListItem>
          <ListItem
            title={Locale.Profile.Actions.RedeemTitle}
            subTitle={Locale.Profile.Actions.RedeemSubTitle}
          >
            <IconButton
              text={Locale.Profile.Actions.Redeem}
              type="primary"
              onClick={() => {
                navigate(Path.RedeemCode);
              }}
            />
          </ListItem>
        </List>

        <List>
          <ListItem>
            <IconButton
              text={Locale.Profile.Actions.Pricing}
              block={true}
              type="primary"
              onClick={() => {
                navigate(Path.Pricing);
              }}
            />
          </ListItem>

          <ListItem>
            <IconButton
              text={Locale.Profile.Actions.Order}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.Order);
              }}
            />
          </ListItem>

          <ListItem>
            <IconButton
              text={Locale.LoginPage.Actions.Logout}
              block={true}
              type="second"
              onClick={() => {
                logout();
              }}
            />
          </ListItem>
        </List>
      </div>
    </ErrorBoundary>
  );
}

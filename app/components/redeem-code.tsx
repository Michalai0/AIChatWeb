import { useState, useEffect } from "react";

import styles from "./redeem-code.module.scss";

import CloseIcon from "../icons/close.svg";
import {
  DangerousListItem,
  Input,
  List,
  ListItem,
  Modal,
  PasswordInput,
  showToast,
  SingleInput,
} from "./ui-lib";

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
import { Package } from "./pricing";

export interface RedeemCodeEntity {
  id: number;
  key: string;
  state: number;
  calcType?: string;
  calcTypeId: number;
  drawCount: number;
  chatCount: number;
  advancedChatCount: number;
  tokens: number;
  days: string;
  redeemTime: Date;
}

export function RedeemCode() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const websiteConfigStore = useWebsiteConfigStore();

  const [loading, setLoading] = useState(false);

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

  const [redeemCode, setRedeemCode] = useState("");
  function redeem() {
    if (!redeemCode) {
      showToast(Locale.Messages.enterRedeemCode); // 使用本地化消息
      return;
    }
    const url = `/redeemCode/${redeemCode}/redeem`;
    const BASE_URL = process.env.BASE_URL;
    const mode = process.env.BUILD_MODE;
    let requestUrl = (mode === "export" ? BASE_URL : "") + "/api" + url;
    fetch(requestUrl, {
      method: "post",
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res) {
          showToast(Locale.Errors.unknownError); // 使用本地化消息
          return;
        }
        if (res?.code !== 0) {
          console.error(Locale.Errors.redeemFailed, res); // 使用本地化消息
          switch (res.code) {
            case 10411:
              showToast(Locale.Errors.invalidCode); // 使用本地化消息
              break;
            case 10412:
              showToast(Locale.Errors.codeNotEffective); // 使用本地化消息
              break;
            case 10413:
              showToast(Locale.Errors.codeRedeemed); // 使用本地化消息
              break;
            default:
              showToast(Locale.Errors.redeemFailed + res.message); // 使用本地化消息
          }
          return;
        }
        console.log(Locale.Success.redeemSuccess); // 使用本地化消息
        showToast(Locale.Success.redeemSuccess); // 使用本地化消息
        getMyRedeemCodes();
      });
  }

  const [myRedeemCodes, setMyRedeemCodes] = useState([] as RedeemCodeEntity[]);
  function getMyRedeemCodes() {
    const url = `/redeemCode/my`;
    const BASE_URL = process.env.BASE_URL;
    const mode = process.env.BUILD_MODE;
    let requestUrl = (mode === "export" ? BASE_URL : "") + "/api" + url;
    setLoading(true);
    fetch(requestUrl, {
      method: "get",
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const codes = res.data || [];
        console.log("codes", codes);
        setMyRedeemCodes(codes);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getMyRedeemCodes();
  }, []);

  function getSubTitle(redeemCodeEntity: RedeemCodeEntity) {
    const pkg = redeemCodeEntity;
    const prefix =
      Locale.Balance.prefix[
        pkg.calcTypeId as keyof typeof Locale.Balance.prefix
      ];
    [pkg.calcTypeId];
    return (
      `<ul style="margin-top: 5px;padding-inline-start: 10px;">` +
      (pkg.tokens
        ? `<li>${prefix} <span style="font-size: 18px;">${
            pkg.tokens === -1 ? Locale.Balance.unlimited : pkg.tokens
          }</span> ${Locale.Balance.tokens}</li>`
        : "") +
      (pkg.chatCount
        ? `<li>${prefix} <span style="font-size: 18px;">${
            pkg.tokens === -1 ? Locale.Balance.unlimited : pkg.tokens
          }</span> ${Locale.Balance.basicChatPoints}</li>`
        : "") +
      (pkg.advancedChatCount
        ? `<li>${prefix} <span style="font-size: 18px;">${
            pkg.tokens === -1 ? Locale.Balance.unlimited : pkg.tokens
          }</span> ${Locale.Balance.advancedChatPoints}</li>`
        : "") +
      (pkg.drawCount
        ? `<li>${prefix} <span style="font-size: 18px;">${
            pkg.tokens === -1 ? Locale.Balance.unlimited : pkg.tokens
          }</span> ${Locale.Balance.drawingPoints}</li>`
        : "") +
      `<li>${Locale.Balance.expirationTime}： <span style="font-size: 18px;">${
        pkg.tokens === -1 ? Locale.Balance.unlimited : pkg.tokens
      }</span> ${Locale.Balance.expirationTime}</li>` +
      `</ul>`
    );
  }

  return (
    <ErrorBoundary>
      <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">
            {websiteConfigStore.redeemCodePageTitle ||
              Locale.RedeemCodePage.Title}
          </div>
          <div className="window-header-sub-title">
            {websiteConfigStore.redeemCodePageSubTitle || ""}
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
              title={Locale.RedeemCodePage.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["redeem-code"]}>
        <div
          dangerouslySetInnerHTML={{
            __html: websiteConfigStore.redeemCodePageBanner,
          }}
        ></div>
        <List>
          <ListItem hideTitle={true} className={styles["redeem-list-item"]}>
            <SingleInput
              value={redeemCode}
              placeholder={Locale.RedeemCodePage.RedeemCodeInput.Placeholder}
              className={styles["input"]}
              onChange={(e) => {
                setRedeemCode(e.currentTarget.value);
              }}
            />
            <IconButton
              type="primary"
              className={styles["button"]}
              text={Locale.RedeemCodePage.Actions.Redeem}
              onClick={() => {
                redeem();
              }}
            />
          </ListItem>
        </List>

        <div
          dangerouslySetInnerHTML={{
            __html: websiteConfigStore.redeemCodePageTop,
          }}
        ></div>

        <List>
          {myRedeemCodes.length === 0 || loading ? (
            <div style={{ textAlign: "center", lineHeight: "100px" }}>
              {loading
                ? Locale.RedeemCodePage.Loading
                : Locale.RedeemCodePage.NoRedeemed}
            </div>
          ) : (
            <></>
          )}
          <>
            {myRedeemCodes.map((redeemCodeEntity) => {
              return (
                <DangerousListItem
                  key={redeemCodeEntity.key}
                  title={
                    redeemCodeEntity.key.substring(0, 8) +
                    "……" +
                    redeemCodeEntity.key.substring(
                      redeemCodeEntity.key.length - 8,
                    )
                  }
                  subTitle={getSubTitle(redeemCodeEntity)}
                  titleCopy={true}
                >
                  <div style={{ minWidth: "100px", maxWidth: "200px" }}>
                    <div style={{ margin: "10px 0" }}>
                      <div
                        style={{ fontSize: "14px" }}
                      >{`${Locale.RedeemCodePage.RedeemedTime}${redeemCodeEntity.redeemTime}`}</div>
                    </div>
                  </div>
                </DangerousListItem>
              );
            })}
          </>
        </List>

        <div
          dangerouslySetInnerHTML={{
            __html: websiteConfigStore.redeemCodePageIndex,
          }}
        ></div>

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
              text={Locale.Profile.Actions.All}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.Balance);
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
        </List>

        <div
          dangerouslySetInnerHTML={{
            __html: websiteConfigStore.redeemCodePageBottom,
          }}
        ></div>
      </div>
    </ErrorBoundary>
  );
}

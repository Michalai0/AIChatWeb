import { useState, useEffect, useCallback } from "react";

import styles from "./balance.module.scss";

import CloseIcon from "../icons/close.svg";
import { List, ListItem, DangerousListItem } from "./ui-lib";

import { IconButton } from "./button";
import { useAuthStore, useProfileStore } from "../store";

// import { copyToClipboard } from "../utils";

import Locale from "../locales";
import { Path } from "../constant";
import { ErrorBoundary } from "./error";
import { useNavigate } from "react-router-dom";
// import { showToast, Popover } from "./ui-lib";
// import { Avatar, AvatarPicker } from "./emoji";

import { useRouter } from "next/navigation";
import { Balance } from "../api/users/[...path]/route";

interface BalanceListResponse {
  code: number;
  message?: string;
  data: Balance[];
}

interface UniversalResponse {
  code: number;
  message?: string;
}

export function Balance() {
  const router = useRouter();
  const navigate = useNavigate();
  const authStore = useAuthStore();
  // const accessStore = useAccessStore();
  const profileStore = useProfileStore();

  // const config = useAppConfig();
  // const updateConfig = config.update;

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

  useEffect(() => {
    if (profileStore.id === 0) {
      console.log("profileStore.id", profileStore.id);
      authStore.logout();
      navigate(Path.Login);
    }
  }, [profileStore, navigate, authStore]);

  function getSubTitle(pkg: Balance) {
    const prefix =
      Locale.Balance.prefix[
        pkg.calcTypeId as keyof typeof Locale.Balance.prefix
      ];
    return (
      `<div>#${pkg.id}</div>
    <ul style="margin-top: 5px;padding-inline-start: 10px; color: ${
      pkg.expired ? "var(--disabled)" : ""
    }">` +
      (pkg.tokens
        ? `<li>${prefix} <span style="font-size: 18px;">${
            pkg.tokens === -1 ? Locale.Balance.unlimited : pkg.tokens
          }</span> ${Locale.Balance.tokens}</li>`
        : "") +
      (pkg.chatCount
        ? `<li>${prefix} <span style="font-size: 18px;">${
            pkg.chatCount === -1 ? Locale.Balance.unlimited : pkg.chatCount
          }</span> ${Locale.Balance.basicChatPoints}</li>`
        : "") +
      (pkg.advancedChatCount
        ? `<li>${prefix} <span style="font-size: 18px;">${
            pkg.advancedChatCount === -1
              ? Locale.Balance.unlimited
              : pkg.advancedChatCount
          }</span> ${Locale.Balance.advancedChatPoints}</li>`
        : "") +
      (pkg.drawCount
        ? `<li>${prefix} <span style="font-size: 18px;">${
            pkg.drawCount === -1 ? Locale.Balance.unlimited : pkg.drawCount
          }</span> ${Locale.Balance.drawingPoints}</li>`
        : "") +
      `<li>${Locale.Balance.expirationTime}：<span style="font-size: 18px;">${pkg.expireTime}</span></li>` +
      `</ul>`
    );
  }
  const [balanceList, setBalanceList] = useState<Balance[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const reloadBalanceList = useCallback((token: string) => {
    setLoading(true);
    const url = "/my/balance";
    const BASE_URL = process.env.BASE_URL;
    const mode = process.env.BUILD_MODE;
    let requestUrl = (mode === "export" ? BASE_URL : "") + "/api" + url;
    fetch(requestUrl, {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const balancesResp = res as unknown as BalanceListResponse;
        if (balancesResp.code !== 0) {
          setErrorMessage(balancesResp.message || "");
          return;
        }
        const balances = balancesResp.data || [];
        setBalanceList(balances);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    reloadBalanceList(authStore.token);
  }, [authStore.token, reloadBalanceList]);

  return (
    <ErrorBoundary>
      <div className="window-header">
        <div className="window-header-title">
          <div className="window-header-main-title">
            {Locale.BalancePage.Title}
          </div>
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
              title={Locale.BalancePage.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["balance"]}>
        <div
          style={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <IconButton
            text={
              loading
                ? Locale.BalancePage.Actions.Refreshing
                : Locale.BalancePage.Actions.Refresh
            }
            type="second"
            style={{ marginRight: "10px" }}
            disabled={loading}
            onClick={() => {
              reloadBalanceList(authStore.token);
            }}
          />

          <IconButton
            text={Locale.BalancePage.Actions.BalanceLog}
            type="second"
            disabled={loading}
            onClick={() => {
              navigate(Path.BalanceLog);
            }}
          />
        </div>

        {balanceList.length === 0 ? (
          <List>
            <div
              className={errorMessage ? styles["danger-text"] : ""}
              style={{
                height: "100px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {errorMessage
                ? errorMessage
                : loading
                  ? Locale.BalancePage.Loading
                  : Locale.BalancePage.NoBalance}
            </div>
          </List>
        ) : (
          <></>
        )}
        {balanceList.length ? (
          <List>
            {balanceList.map((pkg) => {
              return (
                <DangerousListItem
                  key={pkg.id}
                  title={pkg.title}
                  subTitle={getSubTitle(pkg)}
                >
                  <div style={{ minWidth: "100px", maxWidth: "200px" }}>
                    <div style={{ margin: "10px 0" }}>
                      <div style={{ fontSize: "14px" }}>
                        {(pkg.sourceId === 6
                          ? Locale.TransactionType.exchange
                          : Locale.TransactionType.purchase) +
                          Locale.Labels.transactionTime +
                          pkg.createTime}
                      </div>
                    </div>
                  </div>
                </DangerousListItem>
              );
            })}
          </List>
        ) : (
          <></>
        )}

        <List>
          <ListItem>
            <IconButton
              text={Locale.BalancePage.Actions.Pricing}
              block={true}
              type="primary"
              onClick={() => {
                navigate(Path.Pricing);
              }}
            />
          </ListItem>
          <ListItem>
            <IconButton
              text={Locale.BalancePage.Actions.Profile}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.Profile);
              }}
            />
          </ListItem>
          <ListItem>
            <IconButton
              text={Locale.BalancePage.Actions.Order}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.Order);
              }}
            />
          </ListItem>
          <ListItem>
            <IconButton
              text={Locale.BalancePage.Actions.RedeemCode}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.RedeemCode);
              }}
            />
          </ListItem>
        </List>
      </div>
    </ErrorBoundary>
  );
}

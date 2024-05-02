import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import styles from "./pricing.module.scss";

import CloseIcon from "../icons/close.svg";
import {
  Input,
  List,
  DangerousListItem,
  ListItem,
  Modal,
  PasswordInput,
} from "./ui-lib";

import { IconButton } from "./button";
import { useAuthStore, useAccessStore, useWebsiteConfigStore } from "../store";

import Locale from "../locales";
import { Path } from "../constant";
import { ErrorBoundary } from "./error";
import { useNavigate } from "react-router-dom";
import { showToast } from "./ui-lib";
import { useRouter } from "next/navigation";
import { isInWechat } from "../utils/wechat";
import { copyToClipboard, isMobile } from "../utils";

const uuidsByLanguage = {
  "zh-CN": [
    "822a7154-dd2e-4df1-9f05-02f0e59ded16",
    "b849aace-7a1d-4b5e-bb8d-003e5213a119",
    "75bea094-81f0-4c1c-8773-30a5dc25c1fa",
    "27dd609e-7395-4f2e-9028-8e02a7523cb4",
    "fe645034-816d-4b52-aa37-ac134a4a4fba",
    "de745186-c604-450f-aa9b-ae0671b2adef",
    "37218d14-3345-4019-af9e-30d20b222932",
    "420430d9-17bb-4cad-965b-62ff168748f3",
    "5ffee32b-18e6-4d31-8696-1b3af49b5d2a",
    "d3282e87-3283-40c5-a23c-fade1ced8470",
    "65a901b1-c02f-4cdd-88da-00261f2df85f",
  ], // 简体中文

  "zh-HK": [
    "922a6ea0-fb6f-4704-b9ab-f73c19254d1d",
    "bebf0ea9-803f-40f0-80c9-3f31a730233c",
    "4a9a92fb-095a-449e-8d72-e35e7b3bbecf",
    "3ae9494c-c9bc-475f-b226-5862700df126",
    "433efba7-8302-4f0a-8f07-082f43647fcb",
    "24b15cb9-aa76-46d1-9b49-069c6791e9bf",
    "d22d8d7a-cac0-45a5-9632-6594e9a65288",
    "49091b70-94ec-4279-a16a-aa3ec5d8d508",
    "9e96a799-bcfe-4154-b4cb-31ba1312fe6a",
    "90769fa3-fe1e-47ad-8daf-f44684cf9bc1",
    "406c8f37-0ec8-4255-9da5-b6f9692b3bd7",
  ], // 繁体中文

  "en-HK": [
    "1325e9d5-b570-4564-afc2-f41184297cf2",
    "f4f2e261-fcb3-4587-9f02-fae763914cf1",
    "72a94061-db97-407a-8dbf-1d7735180e95",
    "142bfc3f-0c1c-443f-a39b-bcaefb1f03c8",
    "04bf2d7f-103d-403e-8ebf-be1e56b9b7ca",
    "56e3e870-c2c9-4795-8f1b-2345df6fc419",
    "10b03fea-0037-4cb8-a6cc-e40edc4549c9",
    "bdca82eb-18e2-4b60-85dc-4403e60914b6",
    "79ad11e8-05c4-467b-8c41-9ba9da61dff1",
    "77d4d1f5-787a-466f-b159-526c0ad885c8",
  ], // 英语
};
const currentLanguage = Locale.Language as keyof typeof uuidsByLanguage;
const desiredUuids = uuidsByLanguage[currentLanguage] || [];

export interface Package {
  id: number;
  state: number;
  calcType: string;
  calcTypeId: number;
  drawCount: number;
  chatCount: number;
  advancedChatCount: number;
  tokens: number;
  price: string;
  title: string;
  subTitle: string;
  uuid: string;
  top: number;
  days: string;
}
interface PackageResponse {
  code: number;
  message?: string;
  data: Package[];
}

export function showPayChannelChooser(channels: string[]) {
  const div = document.createElement("div");
  div.className = "modal-mask";
  document.body.appendChild(div);

  const root = createRoot(div);
  const closeModal = () => {
    root.unmount();
    div.remove();
  };

  return new Promise<string>((resolve, reject) => {
    root.render(
      <Modal
        title={Locale.PricingPage.ChoosePayChannel}
        actions={[]}
        onClose={() => {
          closeModal();
          reject("cancel");
        }}
        size="small"
      >
        <div className={styles["pay-channel-container"]}>
          {[
            {
              key: "alipay",
              icon: Locale.PayPage.PaymentMethod,
              //cnName: "支付宝",
            },
            {
              key: "wxpay",
              icon: "wechatpay.jpg",
              //cnName: "微信",
            },
            {
              key: "qqpay",
              icon: "stripe.ico",
              //cnName: "Stripe",
            },
          ]
            .filter((c) => channels.includes(c.key))
            .map((channel) => {
              return (
                <div
                  key={channel.key}
                  onClick={() => {
                    closeModal();
                    resolve(channel.key);
                  }}
                  className={styles["pay-channel-item"]}
                >
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={"/" + channel.icon}
                  />
                </div>
              );
            })}
        </div>
        <div className={styles["pay-stripe"]}>
          <p>- Stripe For Credit Card -</p>
        </div>
      </Modal>,
    );
  });
}

export function GoToPayModel(props: {
  title: string;
  wechatCodeUrl: string;
  onClose: () => void;
}) {
  return (
    <div className="modal-mask">
      <Modal title={props.title} onClose={() => props.onClose()} actions={[]}>
        <div>
          <div style={{ textAlign: "center" }}>
            {Locale.PricingPage.PaymentPrompt}
          </div>
          <div style={{ textAlign: "center" }}>
            <a
              href="javascript:void(0)"
              style={{
                background: "#00C250",
                fontSize: "12px",
                color: "#FFFFFF",
                lineHeight: "32px",
                fontWeight: 500,
                display: "inline-block",
                borderRadius: "4px",
                width: "160px",
                marginTop: "20px",
                textDecoration: "none",
              }}
              target="_blank"
              onClick={() => window.open(props.wechatCodeUrl, "_blank")}
            >
              {Locale.PricingPage.ClickToPay}
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function Pricing() {
  const router = useRouter();
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const { pricingPageTitle, pricingPageSubTitle, payChannels } =
    useWebsiteConfigStore();

  const [packages, setPackages] = useState([] as Package[]);
  const [loading, setLoading] = useState(false);
  const [isTokenValid, setTokenValid] = useState("unknown");
  useEffect(() => {
    setLoading(true);
    const url = "/package/onSales";
    const BASE_URL = process.env.BASE_URL;
    const mode = process.env.BUILD_MODE;
    let requestUrl = (mode === "export" ? BASE_URL : "") + "/api" + url;
    fetch(requestUrl, {
      method: "get",
      headers: {
        Authorization: "Bearer " + authStore.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const packagesResp = res as unknown as PackageResponse;
        if (Math.floor(packagesResp.code / 100) === 100) {
          setTokenValid("invalid");
        } else {
          setTokenValid("valid");
        }
        if (!packagesResp.data) {
          setPackages([]);
          return;
        }
        setPackages(
          packagesResp.data.map((pkg) => {
            pkg = { ...pkg };
            if (pkg.title && !pkg.title.includes("<")) {
              pkg.title = `<div style="font-size: 20px;">${pkg.title}</div>`;
            }
            if (!pkg.subTitle) {
              const prefix =
                Locale.Balance.prefix[
                  pkg.calcTypeId as keyof typeof Locale.Balance.prefix
                ];
              [pkg.calcTypeId];
              pkg.subTitle =
                `<ul style="margin-top: 5px;padding-inline-start: 10px;">` +
                (pkg.tokens
                  ? `<li>${prefix} <span style="font-size: 18px;">${
                      pkg.tokens === -1 ? Locale.Balance.unlimited : pkg.tokens
                    }</span> ${Locale.Balance.tokens}</li>`
                  : "") +
                (pkg.chatCount
                  ? `<li>${prefix} <span style="font-size: 18px;">${
                      pkg.chatCount === -1
                        ? Locale.Balance.unlimited
                        : pkg.chatCount
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
                      pkg.drawCount === -1
                        ? Locale.Balance.unlimited
                        : pkg.drawCount
                    }</span> ${Locale.Balance.drawingPoints}</li>`
                  : "") +
                `<li>${Locale.Balance.expirationTime}： <span style="font-size: 18px;">${
                  pkg.days == "-1" ? Locale.Balance.unlimited : pkg.days
                }</span> ${Locale.Balance.days}</li>` +
                `</ul>`;
            }
            return pkg;
          }),
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authStore.token]);

  const [goToPayModelShow, setGoToPayModelShow] = useState(false);
  const [wechatCodeUrl, setWechatCodeUrl] = useState("");

  async function handleClickBuy(pkg: Package) {
    let payChannel;
    console.log("payChannels = " + payChannels);
    if (payChannels.length > 1) {
      payChannel = await showPayChannelChooser(payChannels);
    } else if (payChannels.length > 0) {
      payChannel = payChannels[0];
    } else {
      payChannel = "wxpay";
    }
    // await showPayChannelChooser()
    console.log("buy pkg", pkg);
    const inWechat = isInWechat();
    const inMobile = isMobile();
    //console.log(isMobile() ? 'Mobile device detected.' : 'Not a mobile device.');
    const url = "/order";
    const BASE_URL = process.env.BASE_URL;
    const mode = process.env.BUILD_MODE;
    let requestUrl = (mode === "export" ? BASE_URL : "") + "/api" + url;
    if (mode === "export") {
      showToast("App内暂时不支持购买，请前往网页端操作");
      return;
    }
    setLoading(true);
    fetch(requestUrl, {
      method: "post",
      headers: {
        Authorization: "Bearer " + authStore.token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        packageUuid: pkg.uuid,
        count: 1,
        inWechat,
        inMobile,
        payChannel,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("resp.data", res.data);
        const order = res.data;
        if (res.code !== 0) {
          if (res.code === 11303) {
            showToast(Locale.PricingPage.TOO_FREQUENCILY);
          } else {
            const message = Locale.PricingPage.BuyFailedCause + res.message;
            showToast(message);
            //console.log(message);
          }
          return;
        }

        if (order.state === 5) {
          // console.log(log.message?.url)
          // window.open(log.message?.url, "_blank");
          console.log("router.push", order.payUrl);
          if (order.payChannel === "xunhu") {
            if (inMobile) {
              router.push(order.payUrl);
            } else {
              navigate(Path.Pay + "?uuid=" + order.uuid);
            }
          } else if (order.payChannel === "yizhifu") {
            if (
              order.payUrl.startsWith("weixin://wxpay/bizpayurl") ||
              order.payUrl.startsWith("https://qr.alipay.com/")
            ) {
              navigate(Path.Pay + "?uuid=" + order.uuid);
            } else {
              router.push(order.payUrl);
            }
          } else {
            if (inWechat || inMobile) {
              if (inWechat) {
                // showToast('window.open navigate to ' + order.payUrl)
                // window.open(order.payUrl, "_blank")
                // setGoToPayModelShow(true);
                // setWechatCodeUrl(order.payUrl)
                router.push(order.payUrl);
              } else {
                router.push(order.payUrl);
              }
            } else {
              navigate(Path.Pay + "?uuid=" + order.uuid);
            }
          }
          //
        } else {
          const logs = JSON.parse(order.logs);
          // console.log('order.logs', logs)
          const log = logs[0];
          const message =
            Locale.PricingPage.BuyFailedCause +
            (log.message?.message || log.message);
          console.error(message);
          showToast(message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
    // showToast(Locale.PricingPage.ConsultAdministrator);
  }

  //<a href="https://shop.kiwi-tech.cc/" target="_blank">{Locale.PricingPage.PricingPageUrlTitle}</a>
  return (
    <ErrorBoundary>
      <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">
            {pricingPageTitle || Locale.PricingPage.PricingPageTitle}
          </div>
          <div className="window-header-sub-title">
            {Locale.PricingPage.PricingPageSubTitle1}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // 防止链接默认操作
                navigate(Path.RedeemCode);
              }}
              target="_blank"
            >
              {Locale.PricingPage.PricingPageUrlTitle}
            </a>
            {Locale.PricingPage.PricingPageSubTitle2}
            <div className="window-header-sub-title-url"></div>
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
              title={Locale.PricingPage.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className="window-body">
        <div className="center-content">
          <div className={styles["pricing-header-title"]}>
            <h4>{Locale.PricingPage.PricingHeaderTitle}</h4>
          </div>
          <div className={styles["pricing-header-sub-title"]}>
            <p>{Locale.PricingPage.PricingHeaderSubTitle}</p>
          </div>
        </div>
      </div>
      <div className={styles["pricing"]}>
        {loading ? (
          <div style={{ height: "100px", textAlign: "center" }}>
            {Locale.PricingPage.Loading}
          </div>
        ) : (
          <></>
        )}
        {!loading && isTokenValid === "invalid" && (
          <div style={{ height: "100px", textAlign: "center" }}>
            <a
              href="javascript:void(0)"
              onClick={() => {
                authStore.logout();
                navigate(Path.Login);
              }}
            >
              {Locale.PricingPage.PleaseLogin}
            </a>
          </div>
        )}
        {!loading &&
        !(isTokenValid === "invalid") &&
        (!packages || packages.length === 0) ? (
          <div style={{ height: "100px", textAlign: "center" }}>
            {Locale.PricingPage.NoPackage}
          </div>
        ) : (
          <></>
        )}
        {packages
          .filter((item) => desiredUuids.includes(item.uuid))
          .map((item) => {
            //{Locale.PricingPage.CurrencySymbol}
            return (
              <List key={item.uuid}>
                <DangerousListItem title={item.title} subTitle={item.subTitle}>
                  <div style={{ minWidth: "100px" }}>
                    {/*                    {currentLanguage !== "zh-CN" ? (
                      <div
                        style={{
                          margin: "10px",
                          fontSize: "24px",
                          textAlign: "center",
                          position: "relative", // 确保父容器是相对定位
                          //paddingBottom: "15px", // 增加底部内边距以适应小字
                        }}
                      >
                        {Locale.PricingPage.CurrencySymbol}
                        {item.price}
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            bottom: 0,
                            fontSize: "10px",
                            color: "gray",
                          }}
                        >
                          {Locale.PricingPage.BaseCurrency}
                        </div>
                      </div>
                    ) : (*/}
                    <div
                      style={{
                        margin: "10px",
                        fontSize: "24px",
                        textAlign: "center",
                        position: "relative", // 确保父容器是相对定位
                      }}
                    >
                      {Locale.PricingPage.CurrencySymbol}
                      {item.price}
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                      <IconButton
                        text={Locale.PricingPage.Actions.Buy}
                        type="primary"
                        block={true}
                        disabled={loading}
                        onClick={() => {
                          handleClickBuy(item);
                        }}
                      />
                    </div>
                  </div>
                </DangerousListItem>
              </List>
            );
          })}
        <List>
          <ListItem>
            <div className="pricing_package-introduction__LOQDf">
              <h4>💡 {Locale.PricingPage.QA}</h4>
              <ul>
                <li>
                  <strong>🔢{Locale.PricingPage.PointsFee}</strong>
                  {Locale.PricingPage.PointsDesc}
                </li>
                <li>
                  <strong>🧮{Locale.PricingPage.PointsFactor}</strong>
                  {Locale.PricingPage.PointsFactorDesc}
                </li>
                <li>
                  <strong>💁{Locale.PricingPage.CS}</strong>
                  <span onClick={() => copyToClipboard("kiwi1274")}>
                    {Locale.PricingPage.WechatCS}kiwi1274
                  </span>
                  、
                  <span onClick={() => copyToClipboard("+85263690062")}>
                    {Locale.PricingPage.WhatsAppCS}+85263690062
                  </span>
                  、
                  <span onClick={() => copyToClipboard("support@kiwi-chat.cc")}>
                    {Locale.PricingPage.EmailCS}support@kiwi-chat.cc
                  </span>
                </li>
                <li>
                  <strong>🏷️{Locale.PricingPage.Discount}</strong>
                  {Locale.PricingPage.DiscountDesc}
                  <span onClick={() => copyToClipboard("kiwi__chat")}>
                    IG: kiwi__chat
                  </span>
                  。
                </li>
              </ul>
            </div>
          </ListItem>
        </List>
        <List>
          <ListItem>
            <IconButton
              text={Locale.PricingPage.Actions.Order}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.Order);
              }}
            />
          </ListItem>
          <ListItem>
            <IconButton
              text={Locale.PricingPage.Actions.RedeemCode}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.RedeemCode);
              }}
            />
          </ListItem>
        </List>
      </div>

      {goToPayModelShow && (
        <GoToPayModel
          title={"前往支付"}
          wechatCodeUrl={wechatCodeUrl}
          onClose={() => setGoToPayModelShow(false)}
        />
      )}
    </ErrorBoundary>
  );
}

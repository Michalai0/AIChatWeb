import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useLocation, useNavigate } from "react-router-dom";
import NextImage from "next/image";
import WechatPayLogo from "../icons/wechat-pay-logo.png";
import AlipayLogo from "../icons/alipay-logo.png";
import AlipayLogoHK from "../icons/alipay-logo-hk.jpg";

import styles from "./pay.module.scss";

import CloseIcon from "../icons/close.svg";
import { ErrorBoundary } from "./error";
import { useAuthStore, useWebsiteConfigStore } from "../store";

import { IconButton } from "./button";
import { Path } from "../constant";

import Locale from "../locales";
import { showToast } from "./ui-lib";

export function Pay() {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const { payPageTitle, payPageSubTitle } = useWebsiteConfigStore();
  const [paymentMethod, setPaymentMethod] = useState(WechatPayLogo); // 假设有一个初始值
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderUuid = params.get("uuid");
  const [order, setOrder] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(true);
  // const [error, setError] = useState(false)

  const [qrCode, setQrCode] = useState("");
  const [lastOrderState, setLastOrderState] = useState<number | null>(null);
  useEffect(() => {
    setLoading(true);
    const url = "/order/" + orderUuid;
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
        const order = res.data;
        console.log("order", order);
        setOrder(order);
        setLastOrderState(order.state);
        if (order.payUrl.startsWith("https://qr.alipay.com/")) {
          if (Locale.Language === "zh-CN") {
            setPaymentMethod(AlipayLogo);
          } else {
            setPaymentMethod(AlipayLogoHK);
          }
        }
        if (order.state === 5) {
          // STATE_REMOTE_CREATED
          setQrCode(order.payUrl);
          setPaying(true);
        } else {
          setPaying(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      // console.log('qrCode', qrCode)
      if (!qrCode) {
        return;
      }
      const url = "/order/" + orderUuid;
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
          const order = res.data;
          console.log("order.state", order.state);
          setOrder(order);
          if (lastOrderState === 5 && order.state === 10) {
            showToast(Locale.PayPage.PaidSuccess);
            navigate(Path.Balance);
          }
          if (order.state != 5) {
            setPaying(false);
            clearInterval(timer);
          } else {
            setPaying(false);
          }
          setLastOrderState(order.state);
        });
    }, 1200);

    return () => {
      console.log("clearInterval");
      clearInterval(timer);
    };
  }, [qrCode]);
  console.log(paymentMethod.src); // 在组件渲染之前打印值
  return (
    <ErrorBoundary>
      <div className="window-header">
        <div className="window-header-title">
          <div className="window-header-main-title">
            {payPageTitle || Locale.PayPage.PayTittle}
          </div>
          <div className="window-header-sub-title">{payPageSubTitle || ""}</div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => navigate(Path.Home)}
              bordered
              title={Locale.PayPage.Actions.Close}
            />
          </div>
        </div>
      </div>
      <div className={styles["pay"]}>
        <div className={styles["container"]}>
          <NextImage
            src={paymentMethod.src}
            width={130}
            height={37}
            alt="wechat-pay"
          />
          <div style={{ marginTop: "10px" }}>
            {order ? order.title : Locale.PayPage.DefaultName}
          </div>
          <div style={{ lineHeight: "50px" }}>
            HK$<span style={{ fontSize: "32px" }}>{order && order.price}</span>
          </div>
          {loading && (
            <div
              style={{
                width: "230px",
                height: "230px",
                backgroundColor: "#f0f0f0",
                lineHeight: "230px",
                textAlign: "center",
              }}
            >
              Loading
            </div>
          )}
          {qrCode && !loading && (
            <QRCode
              value={qrCode}
              size={230}
              level={"H"}
              includeMargin={true}
              style={{ margin: "auto", display: "block" }}
            />
          )}
          <div className={styles["bottom"]}>{Locale.PayPage.PayPrompt}</div>
        </div>

        {order && (
          <div style={{ textAlign: "center", margin: "20px" }}>
            {Locale.PayPage.CurrentOrder}
            {order.state === 0
              ? Locale.PayPage.OrderStatus.unsubmitted
              : order.state === 5
                ? order.payUrl
                  ? Locale.PayPage.OrderStatus.awaitingPayment
                  : Locale.PayPage.OrderStatus.timeout
                : order.state === 6
                  ? Locale.PayPage.OrderStatus.submissionFailed
                  : order.state === 10
                    ? Locale.PayPage.OrderStatus.paid
                    : order.state === 12
                      ? Locale.PayPage.OrderStatus.paymentFailed
                      : order.state === 20
                        ? Locale.PayPage.OrderStatus.cancelled
                        : order.state === 30
                          ? Locale.PayPage.OrderStatus.deleted
                          : ""}
          </div>
        )}

        <div className={styles["buttons"]}>
          <div style={{ marginBottom: "10px" }}>
            <IconButton
              text={Locale.Profile.Actions.Pricing}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.Pricing);
              }}
            />
          </div>
          <div>
            <IconButton
              text={Locale.PricingPage.Actions.Order}
              block={true}
              type="second"
              onClick={() => {
                navigate(Path.Order);
              }}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

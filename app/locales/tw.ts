import { SubmitKey } from "../store/config";
import type { PartialLocaleType } from "./index";

const tw: PartialLocaleType = {
  PlugInName: "聯網插件",
  DefaultChatName: "新的對話",
  EnterInviteCode: "請輸入邀請碼！",
  Language: "zh-HK",
  WIP: "該功能仍在開發中……",
  Error: {
    Unauthorized: "目前您的狀態是未授權，請前往[設定頁面](/#/auth)輸入授權碼。",
  },
  Sidebar: {
    Title: "公告",
    Close: "關閉",
    synchronizing: "同步中...",
    SynchronizationSuccess: "同步成功！",
    SynchronizationFail: "同步失敗，請重試。",
    SynchronizationError: "同步出現異常，請檢查網絡連接。",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} 則對話`,
  },
  Chat: {
    SubTitle: (count: number) => `您已經與 ChatGPT 進行了 ${count} 則對話`,
    EditMessage: {
      Title: "編輯訊息記錄",
      Topic: {
        Title: "聊天主題",
        SubTitle: "更改當前聊天主題",
      },
    },
    Actions: {
      ChatList: "檢視訊息列表",
      CompressedHistory: "檢視壓縮後的歷史 Prompt",
      Export: "匯出聊天紀錄",
      Copy: "複製",
      Stop: "停止",
      Retry: "重試",
      Delete: "刪除",
      Pin: "固定",
      PinToastContent: "已將 1 條對話固定至預設提示詞",
      PinToastAction: "查看",
      Edit: "編輯",
    },
    TooFrequently: "您發送太快，請稍後重試",
    Rename: "重新命名對話",
    Typing: "正在輸入…",
    SensitiveWordsTip: (question: string) =>
      `您的提問中包含敏感詞：${question}`,
    BalanceNotEnough: "您的余額不足，請前往服務訂閱購買！",
    Input: (submitKey: string) => {
      var inputHints = `輸入訊息後，按下 ${submitKey} 鍵即可傳送`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter 鍵換行";
      }
      return inputHints;
    },
    Send: "傳送",
    Config: {
      Reset: "重設",
      SaveAs: "另存新檔",
      Confirm: "確定",
    },
    IsContext: "預設提示詞",
    SessionLoading: "加載會話……",
    SessionLoadingError: (err: any) => "加載會話失敗：" + err,
    ReloadSesison: "重新加載",
    DeleteDeletedSessionConfirm: "該會話已在其他客戶端刪除，確定刪除本地會話？",
    ModelNotAvailable: "當前模型已不可用，請更換模型進行會話",
    PleaseWaitForFinished: "請等待本次請求結束或終止請求",
  },
  Midjourney: {
    Uploading: "上傳中……",
    SelectImgMax: (max: number) => `最多可選擇 ${max} 張圖片`,
    InputDisabled: "該模式下不支持輸入內容",
    NotSupports: "暫不支持此操作",
    HasImgTip:
      "提示：墊圖模式/識圖(describe)模式只會使用第一張圖片，混圖(blend)模式會按順序使用選中的5張圖片（點擊圖片可以移除）",
    ModeImagineUseImg: "墊圖（圖生圖）模式",
    ModeBlend: "混圖模式",
    ModeDescribe: "識圖（圖生文）模式",
    NeedInputUseImgPrompt: "墊圖模式下需要輸入內容才能使用圖片，請輸入內容",
    ImagineMaxImg: (max: number) => `墊圖（圖生圖）模式下至多 ${max} 張圖片`,
    gpt4vMaxImg: (max: number) => `該模式下至多 ${max} 張圖片`,
    BlendMinImg: (min: number, max: number) =>
      `混圖模式下至少需要 ${min} 張圖片，至多 ${max} 張圖片`,
    DescribeMaxImg: (max: number) => `識圖（圖生文）模式下至多 ${max} 張圖片`,
    TaskErrUnknownType: "任務提交失敗：未知的任務類型",
    TaskErrNotSupportType: (type: string) =>
      `任務提交失敗：不支持的任務類型 -> ${type}`,
    StatusCode: (code: number) => `狀態碼：${code}`,
    TaskSubmitErr: (err: string) => `任務提交失敗：${err}`,
    RespBody: (body: string) => `響應體：${body}`,
    None: "無",
    UnknownError: "未知錯誤",
    UnknownReason: "未知原因",
    TaskPrefix: (prompt: string, taskId: string) =>
      `**畫面描述:** ${prompt}\n**任務ID:** ${taskId}\n`,
    PleaseWait: "請稍等片刻",
    TaskSubmitOk: "任務提交成功",
    TaskStatusFetchFail: "任務狀態獲取失敗",
    TaskStatus: "任務狀態",
    TaskRemoteSubmit: "任務已提交至繪圖服務器",
    TaskProgressTip: (progress: number | undefined) =>
      `正在繪製${progress ? `，當前進度：${progress}%` : ""}`,
    TaskNotStart: "等待調度",
    Refresh: "獲取最新進度",
    Url: "地址",
    SettingProxyCoverTip:
      "在此處定義的MidjourneyProxy地址會覆蓋環境變量中的MIDJOURNEY_PROXY_URL",
    ImageAgent: "圖像代理",
    ImageAgentOpenTip:
      "開啟之後，返回的Midjourney圖片將會通過本程序自身代理，所以本程序需要處於可以訪問cdn.discordapp.com的網絡環境中才有效",
  },
  Export: {
    Title: "將聊天記錄匯出為 Markdown",
    Copy: "複製全部",
    Download: "下載檔案",
    Share: "分享到 ShareGPT",
    MessageFromYou: "來自您的訊息",
    MessageFromChatGPT: "來自 ChatGPT 的訊息",
    Format: {
      Title: "導出格式",
      SubTitle: "可以導出 Markdown 文本或者 PNG 圖片",
    },
    IncludeContext: {
      Title: "包含應用上下文",
      SubTitle: "是否在訊息中展示應用上下文",
    },
    Steps: {
      Select: "選取",
      Preview: "預覽",
    },
    Image: {
      Toast: "正在生成截圖",
      Modal: "長按或右鍵保存圖片",
    },
  },
  Select: {
    Search: "搜索訊息",
    All: "選取全部",
    Latest: "最近幾條",
    Clear: "清除選中",
  },
  Memory: {
    Title: "歷史摘要",
    EmptyContent: "對話內容過短，無需總結",
    Send: "自動壓縮聊天記錄並作為上下文發送",
    Copy: "復製摘要",
    Reset: "[unused]",
    ResetConfirm: "確認清空歷史摘要？",
    CloseConfirm: "您已修改部分配置項，確定不保存直接退出？",
    ConfirmText: "不保存直接退出",
  },
  Home: {
    NewChat: "新的對話",
    DeleteChat: "確定要刪除選取的對話嗎？",
    DeleteToast: "已刪除對話",
    Revert: "撤銷",
    NoNotice: "暫無公告",
    NoPopUP: "今日不再彈出",
  },
  LoginPage: {
    Title: "登錄",
    SubTitle: "登陸後使用Kiwi Chat",
    Username: {
      Title: "用戶名",
      SubTitle: "",
      Placeholder: "請輸入用戶名或郵箱",
    },
    UsernameOrPhone: {
      Title: "用戶名或手機號",
      SubTitle: "",
      Placeholder: "請輸入用戶名或手機號",
    },
    Password: {
      Title: "密碼",
      SubTitle: "",
      Placeholder: "請輸入密碼",
    },
    Actions: {
      Close: "關閉",
      Login: "登錄",
      Logout: "退出登錄",
      Logingout: "Logging out",
    },
    Toast: {
      Success: "登錄成功，正在同步會話信息",
      Logining: "登錄中……",
      EmptyUserName: "用戶名或郵箱不能為空",
      EmptyPassword: "密碼不能為空！",
    },
    GoToRegister: "前往註冊",
    ForgetPassword: "忘記/重置密碼",
    FetchingSessions: "獲取會話中……",
  },
  RegisterPage: {
    Agree: "同意",
    TermsOfUse: "用戶協議",
    ViewTOS: "訪問用戶協議",
    Title: "註冊",
    SubTitle: "註冊後贈送免費額度哦",
    Name: {
      Title: "昵稱",
      SubTitle: "",
      Placeholder: "請輸入昵稱，可不填",
    },
    Email: {
      Title: "郵箱",
      SubTitle: "",
      Placeholder: "請輸入郵箱",
    },
    EmailCode: {
      Title: "驗證碼",
      SubTitle: "系統將向您郵箱發送的驗證碼",
      Placeholder: "請輸入驗證碼",
    },
    Phone: {
      Title: "手機號",
      SubTitle: "",
      Placeholder: "請輸入手機號",
    },
    PhoneCode: {
      Title: "驗證碼",
      SubTitle: "系統將向您手機號發送的短信驗證碼",
      Placeholder: "請輸入短信驗證碼",
    },
    Username: {
      Title: "用戶名",
      SubTitle: "用戶名僅限字母/數字/下劃線",
      Placeholder: "請輸入用戶名",
    },
    Password: {
      Title: "密碼",
      SubTitle: "",
      Placeholder: "請輸入密碼",
    },
    ConfirmedPassword: {
      Title: "確認密碼",
      SubTitle: "",
      Placeholder: "請再次輸入密碼",
    },
    Actions: {
      Close: "關閉",
    },
    Toast: {
      MustAgreeToTerms: "請同意並勾選服務條款",
      Success: "註冊成功，正在前往聊天……",
      Registering: "註冊中……",
      Failed: "註冊失敗！",
      FailedWithReason: "註冊失敗！原因：",
      PasswordNotTheSame: "兩次輸入的密碼不一致！",
      PasswordEmpty: "密碼不能為空！",
      SendEmailCode: "發送驗證碼",
      EmailCodeSending: "驗證碼發送中",
      EmailCodeSent: "驗證碼已發送，請查看郵箱",
      EmailIsEmpty: "請輸入郵箱",
      EmailCodeSentFrequently: "驗證碼發送過於頻繁，請稍後再試",
      EmailFormatError: "郵箱格式不正確",
      EmailCodeEmpty: "請輸入郵箱驗證碼",
      EmailExistsError: "該郵箱已註冊",
      SendPhoneCode: "發送短信驗證碼",
      PhoneCodeSending: "驗證碼發送中",
      PhoneCodeSent: "驗證碼已發送，請查看短信",
      PhoneIsEmpty: "請輸入手機號",
      PhoneCodeSentFrequently: "驗證碼發送過於頻繁，請稍後再試",
      PhoneFormatError: "手機號格式不正確",
      PhoneCodeEmpty: "請輸入短信驗證碼",
      PhoneExistsError: "該手機號已註冊",
    },
    GoToLogin: "前往登錄",
    Captcha: "",
    CaptchaTitle: "點擊刷新驗證碼",
    CaptchaIsEmpty: "請輸入圖形驗證碼",
    CaptchaLengthError: "圖形驗證碼長度不正確",
    CaptchaInput: {
      Title: "圖形驗證碼",
      SubTitle: "",
      Placeholder: "請輸入圖中的驗證碼",
    },
  },
  ForgetPasswordPage: {
    Title: "重置密碼",
    SubTitle: "",
    Toast: {
      PasswordResetting: "重置密碼中",
      PasswordResetFailed: "重置密碼失敗！",
      PasswordResetSuccess: "重置成功，正在前往聊天……",
      PasswordResetFailedWithReason: "重置失敗！原因：",
    },
    Actions: {
      Close: "關閉",
    },
  },
  Profile: {
    EarliestDueOrder: "以上僅展示最早到期的套餐",
    InvalidOrder: "您所購套餐已經全部過期",
    EmptyOrder: "您尚未購買任何套餐",
    Loading: "加載中...",
    Title: "個人中心",
    SubTitle: "個人中心",
    Username: "賬號",
    Email: "郵箱",
    Phone: "手機號",
    Invitor: {
      Title: "邀請人",
      Record: "邀請記錄",
    },
    InviteCode: {
      RecordTitle: "邀請記錄",
      RecordSubTitle: "查看所有邀請記錄",
      Title: "邀請碼(選填)",
      TitleRequired: "邀請碼(必填)",
      Placeholder: "輸入邀請碼獲得額外權益",
    },
    Tokens: {
      Title: "Tokens",
      SubTitle: "",
    },
    ChatCount: {
      Title: "基礎聊天積分",
      SubTitle: "",
    },
    AdvanceChatCount: {
      Title: "高級聊天積分",
      SubTitle: "",
    },
    DrawCount: {
      Title: "繪圖積分",
      SubTitle: "",
    },
    Actions: {
      Close: "關閉",
      Pricing: "購買套餐",
      Order: "訂單中心",
      BalanceLog: "額度變動記錄",
      GoToBalanceList: "更多",
      ConsultAdministrator: "請咨詢站長",
      All: "所有套餐",
      CreateInviteCode: "生成邀請碼",
      Copy: "復製鏈接",
      Redeem: "兌換碼",
      RedeemTitle: "兌換碼",
      RedeemSubTitle: "輸入兌換碼兌換套餐",
    },
    BalanceItem: {
      Title: "套餐類型",
      SubTitle: "",
      CalcTypes: {
        Total: "總額",
        Daily: "每天",
        Hourly: "每小時",
        ThreeHourly: "每3小時",
      },
    },
    ExpireList: {
      Title: "過期時間",
      Total: "總額",
      SubTitle: "",
    },
  },
  RedeemCodePage: {
    RedeemedTime: "兌換時間：",
    NoRedeemed: "暫未兌換",
    Loading: "加載中……",
    Title: "兌換碼",
    RedeemCodeInput: {
      Title: "兌換碼",
      Placeholder: "請輸入兌換碼",
    },
    Actions: {
      Close: "關閉",
      Redeem: "開始兌換",
    },
  },
  PricingPage: {
    QA: "常見問題",
    PointsFee: "積分計費：",
    PointsDesc:
      "積分計費是一種按次付費的計費方式，您可以根據需求購買不同數量的積分包，倍率為1倍的情況下1個積分為1次對話次數。積分分為基礎、高級、繪畫三類。\n" +
      "                            基礎積分可以使用中國國產大模型，高級積分可以使用ChatGPT4等高級模型，繪畫積分用於繪畫。",
    PointsFactor: "積分倍率：",
    PointsFactorDesc:
      "如沒有特殊標明則默認為1倍率，其他倍率可以在模型列表查看。",
    CS: "客服：",
    WechatCS: "微信客服：",
    WhatsAppCS: "WhatsApp客服：",
    EmailCS: "郵箱客服：",
    Discount: "關於優惠：",
    DiscountDesc: "本站不定期推出優惠活動，請關註",
    PricingHeaderTitle: "💡 常見問題滑動到底部查看",
    PricingHeaderSubTitle:
      "充值後請耐心等待 5-10 分鐘左右到賬，如有問題請聯系客服(底部查看)",
    BaseCurrency: "人民幣結算",
    ClickToPay: "點此付款",
    PaymentPrompt: "訂單已創建，請點擊以下按鈕前往付款",
    PricingPageTitle: "套餐購買",
    PricingPageSubTitle1: "其他支付方式請到",
    PricingPageSubTitle2: "兌換",
    PricingPageUrlTitle: "兌換頁面",
    CurrencySymbol: "HK$",
    Title: "充值",
    SubTitle: "暢享與AI聊天的樂趣",
    Actions: {
      Close: "關閉",
      Buy: " 購買 ",
      Order: "訂單中心",
      RedeemCode: "兌換碼",
    },
    NoPackage: "暫無可用套餐",
    Loading: "請稍候……",
    PleaseLogin: "請先登錄",
    ConsultAdministrator: "請咨詢站長",
    BuyFailedCause: "套餐購買失敗！原因：",
    TOO_FREQUENCILY: "操作過於頻繁，請稍後再試",
    CREATE_ORDER_FAILED: "創建訂單失敗",
    ChoosePayChannel: "請選擇支付方式",
  },
  PayPage: {
    PaymentMethod: "AlipayHK.webp",
    DefaultName: "套餐購買",
    CurrentOrder: "當前訂單：",
    OrderStatus: {
      unsubmitted: "未提交",
      awaitingPayment: "待支付",
      timeout: "已超時",
      submissionFailed: "提交失敗",
      paid: "已支付",
      paymentFailed: "支付失敗",
      cancelled: "已取消",
      deleted: "已刪除",
    },
    PayPrompt: "請使用對應APP掃碼支付Buy",
    PayTittle: "訂單支付",
    PaidSuccess: "支付成功",
    Actions: {
      Close: "關閉",
    },
  },
  BalancePage: {
    Title: "已購套餐",
    NoBalance: "您尚未購買任何套餐",
    Loading: "請稍候……",
    Actions: {
      Close: "關閉",
      Pricing: "購買套餐",
      Order: "訂單中心",
      Profile: "個人中心",
      Refresh: "刷新",
      Refreshing: "刷新中……",
      RedeemCode: "兌換碼",
      BalanceLog: "額度變動記錄",
    },
    Footer: {
      Note: "僅展示最近30天的最近50條記錄",
    },
  },
  InvitationPage: {
    Title: "邀請記錄",
    NoInvitation: "快將邀請鏈接分享給朋友吧",
    Loading: "請稍候……",
    Actions: {
      Close: "關閉",
      Profile: "個人中心",
      Refresh: "刷新",
      Refreshing: "刷新中……",
    },
  },
  BalanceLogPage: {
    Title: "額度變動記錄",
    NoBalance: "暫無記錄",
    Loading: "請稍候……",
    Actions: {
      Close: "關閉",
      Profile: "個人中心",
      Refresh: "刷新",
      Refreshing: "刷新中……",
      Balance: "所有套餐",
    },
  },
  OrderPage: {
    PP: "套餐購買：",
    PaymentTime: "支付時間：",
    CreatTime: "創建時間：",
    OrderNum: "訂單號：……",
    Status: "狀態：",
    CurrencySymbol: "HK$",
    Title: "訂單中心",
    NoOrder: "暫無訂單",
    Loading: "請稍候……",
    StateError: "狀態錯誤！",
    CancelFailedForStateError: "當前狀態下無法取消",
    CancelSuccess: "訂單取消成功",
    CancelFailure: "訂單取消失敗",
    TryAgainLaster: "操作失敗，請稍候重試",
    PleaseWaitForDataSync:
      "數據可能延遲，支付成功請在10分鐘後查看訂單狀態，請勿重復支付",
    Actions: {
      Pay: "支付",
      Cancel: "取消",
      Pricing: "購買套餐",
      Profile: "個人中心",
      Copy: "復製",
      Refresh: "刷新",
      Refreshing: "刷新中……",
    },
  },
  Settings: {
    Title: "設定",
    SubTitle: "設定選項",
    Danger: {
      Reset: {
        Title: "重置所有設置",
        SubTitle: "重置所有設置項恢復默認值",
        Action: "立即重置",
        Confirm: "確認重置所有設置？",
      },
      Clear: {
        Title: "清除所有數據",
        SubTitle: "清除所有聊天、設置數據",
        Action: "立即清除",
        Confirm: "確認清除所有聊天、設置數據？",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "所有語言",
    },
    Avatar: "大頭貼",
    FontSize: {
      Title: "字型大小",
      SubTitle: "聊天內容的字型大小",
    },
    InjectSystemPrompts: {
      Title: "匯入系統提示",
      SubTitle: "強製在每個請求的訊息列表開頭新增一個模擬 ChatGPT 的系統提示",
    },
    InputTemplate: {
      Title: "用戶輸入預處理",
      SubTitle: "用戶最新的一條消息會填充到此模板",
    },
    Update: {
      Version: (x: string) => `目前版本：${x}`,
      IsLatest: "已是最新版本",
      CheckUpdate: "檢查更新",
      IsChecking: "正在檢查更新...",
      FoundUpdate: (x: string) => `發現新版本：${x}`,
      GoToUpdate: "前往更新",
    },
    SendKey: "傳送鍵",
    Theme: "主題",
    TightBorder: "緊湊邊框",
    SendPreviewBubble: {
      Title: "預覽氣泡",
      SubTitle: "在預覽氣泡中預覽 Markdown 內容",
    },
    AutoGenerateTitle: {
      Title: "自動生成標題",
      SubTitle: "根據對話內容生成合適的標題",
    },
    Sync: {
      CloudState: "雲端數據",
      NotSyncYet: "還沒有進行過同步",
      Success: "同步成功",
      Fail: "同步失敗",

      Config: {
        Modal: {
          Title: "配置雲同步",
          Check: "檢查可用性",
        },
        SyncType: {
          Title: "同步類型",
          SubTitle: "選擇喜愛的同步服務器",
        },
        Proxy: {
          Title: "啟用代理",
          SubTitle: "在瀏覽器中同步時，必須啟用代理以避免跨域限製",
        },
        ProxyUrl: {
          Title: "代理地址",
          SubTitle: "僅適用於本項目自帶的跨域代理",
        },

        WebDav: {
          Endpoint: "WebDAV 地址",
          UserName: "用戶名",
          Password: "密碼",
        },

        UpStash: {
          Endpoint: "UpStash Redis REST Url",
          UserName: "備份名稱",
          Password: "UpStash Redis REST Token",
        },
      },

      LocalState: "本地數據",
      Overview: (overview: any) => {
        return `${overview.chat} 次對話，${overview.message} 條消息，${overview.prompt} 條提示詞，${overview.mask} 個面具`;
      },
      ImportFailed: "導入失敗",
    },
    Mask: {
      Splash: {
        Title: "面具啟動頁面",
        SubTitle: "新增聊天時，呈現面具啟動頁面",
      },
      Builtin: {
        Title: "隱藏內置應用",
        SubTitle: "在所有面具列表中隱藏內置應用",
      },
    },
    Prompt: {
      Disable: {
        Title: "停用提示詞自動補齊",
        SubTitle: "在輸入框開頭輸入 / 即可觸發自動補齊",
      },
      List: "自定義提示詞列表",
      ListCount: (builtin: number, custom: number) =>
        `內建 ${builtin} 條，使用者定義 ${custom} 條`,
      Edit: "編輯",
      Modal: {
        Title: "提示詞列表",
        Add: "新增一條",
        Search: "搜尋提示詞",
      },
      EditModal: {
        Title: "編輯提示詞",
      },
    },
    HistoryCount: {
      Title: "附帶歷史訊息數",
      SubTitle: "每次請求附帶的歷史訊息數",
    },
    CompressThreshold: {
      Title: "歷史訊息長度壓縮閾值",
      SubTitle: "當未壓縮的歷史訊息超過該值時，將進行壓縮",
    },

    Usage: {
      Title: "帳戶餘額",
      SubTitle(used: any, total: any) {
        return `本月已使用 $${used}，訂閱總額 $${total}`;
      },
      IsChecking: "正在檢查…",
      Check: "重新檢查",
      NoAccess: "輸入 API Key 檢視餘額",
    },

    Model: "模型 (model)",
    Temperature: {
      Title: "隨機性 (temperature)",
      SubTitle: "值越大，回應越隨機",
    },
    MaxTokens: {
      Title: "單次回應限製 (max_tokens)",
      SubTitle: "單次互動所用的最大 Token 數",
    },
    PresencePenalty: {
      Title: "話題新穎度 (presence_penalty)",
      SubTitle: "值越大，越有可能拓展到新話題",
    },
    FrequencyPenalty: {
      Title: "頻率懲罰度 (frequency_penalty)",
      SubTitle: "值越大，越有可能降低重複字詞",
    },
    Version: {
      Title: "版本",
      SubTitle: "",
    },
  },
  Store: {
    DefaultTopic: "新的對話",
    BotHello: "請問需要我的協助嗎？",
    Error: "出錯了，請稍後再嘗試",
    Prompt: {
      History: (content: string) =>
        "這是 AI 與使用者的歷史聊天總結，作為前情提要：" + content,
      Topic:
        "Use the language used by the user (e.g. en for english conversation, zh-hant for chinese conversation, etc.) to generate a title (at most 6 words) summarizing our conversation without any lead-in, quotation marks, preamble like 'Title:', direct text copies, single-word replies, quotation marks, translations, or brackets. Remove enclosing quotation marks. The title should make third-party grasp the essence of the conversation in first sight.",
      Summarize:
        "Use the language used by the user (e.g. en-us for english conversation, zh-hant for chinese conversation, etc.) to summarise the conversation in at most 200 words. The summary will be used as prompt for you to continue the conversation in the future.",
    },
  },
  Copy: {
    Success: "已複製到剪貼簿中",
    Failed: "複製失敗，請賦予剪貼簿權限",
  },
  Download: {
    Success: "內容已下載到您的目錄。",
    Failed: "下載失敗。",
  },
  Context: {
    Toast: (x: any) => `已設定 ${x} 條前置上下文`,
    Edit: "前置上下文和歷史記憶",
    Add: "新增一條",
    Clear: "上下文已清除",
    Revert: "恢復上下文",
  },
  Shop: {
    Name: "服務訂閱",
  },
  User: {
    Name: "個人中心",
  },
  Sync: {
    Name: "同步對話",
  },
  Plugin: {
    Name: "外掛",
    Enabled: "已開啟",
    Disabled: "已關閉",
  },
  FineTuned: { Sysmessage: "你是一個助手" },
  Mask: {
    Name: "應用中心",
    Page: {
      Title: "預設角色面具",
      SubTitle: (count: number) => `${count} 個預設角色定義`,
      Search: "搜尋角色面具",
      Create: "新增",
    },
    Item: {
      Info: (count: number) => `包含 ${count} 條預設對話`,
      Chat: "對話",
      View: "檢視",
      Edit: "編輯",
      Delete: "刪除",
      DeleteConfirm: "確認刪除？",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `編輯預設面具 ${readonly ? "（只讀）" : ""}`,
      Download: "下載預設",
      Clone: "複製預設",
    },
    Config: {
      Avatar: "角色頭像",
      Name: "角色名稱",
      Description: {
        title: "角色描述",
        SubTitle: "僅限後臺應用支持編輯",
      },
      Sync: {
        Title: "使用全局設置",
        SubTitle: "當前對話是否使用全局模型設置",
        Confirm: "當前對話的自定義設置將會被自動覆蓋，確認啟用全局設置？",
      },
      HideContext: {
        Title: "隱藏預設對話",
        SubTitle: "隱藏後預設對話不會出現在聊天界面",
      },
      Share: {
        Title: "分享此面具",
        SubTitle: "生成此面具的直達鏈接",
        Action: "復製鏈接",
      },
    },
  },
  NewChat: {
    Return: "返回",
    Skip: "跳過",
    Title: "挑選一個面具",
    SubTitle: "現在開始，與面具背後的靈魂思維碰撞",
    More: "搜尋更多",
    NotShow: "不再呈現",
    ConfirmNoShow: "確認停用？停用後可以隨時在設定中重新啟用。",
  },
  URLCommand: {
    Code: "檢測到鏈接中已經包含訪問碼，是否自動填入？",
    Settings: "檢測到鏈接中包含了預製設置，是否自動填入？",
  },
  UI: {
    Confirm: "確認",
    Cancel: "取消",
    Close: "關閉",
    Create: "新增",
    Edit: "編輯",
    Export: "導出",
    Import: "導入",
    Sync: "同步",
    Config: "配置",
  },
  Exporter: {
    Model: "模型",
    Messages: "訊息",
    Topic: "主題",
    Time: "時間",
  },
  Balance: {
    prefix: {
      1: "總額剩余",
      2: "每天",
      3: "每小時",
      4: "每3小時",
    },
    tokens: "Tokens",
    basicChatPoints: "基礎聊天積分",
    advancedChatPoints: "高級聊天積分",
    drawingPoints: "繪畫積分",
    expirationTime: "到期時間",
    unlimited: "無限",
    days: "天",
  },
  OrderState: {
    0: "待提交",
    5: "待支付",
    6: "提交失敗",
    10: "已支付",
    12: "支付失敗",
    20: "已取消",
    30: "已刪除",
    paymentTimeout: "支付超時",
  },
  TransactionType: {
    exchange: "兌換",
    purchase: "購買",
  },
  Labels: {
    transactionTime: "時間：",
  },
  Messages: {
    enterRedeemCode: "請輸入兌換碼！",
  },
  Errors: {
    unknownError: "未知錯誤",
    redeemFailed: "兌換失敗：",
    invalidCode: "兌換失敗：兌換碼無效",
    codeNotEffective: "兌換失敗：兌換碼未生效",
    codeRedeemed: "兌換失敗：兌換碼已兌換",
    requestFailed: "請求失敗",
  },
  Success: {
    redeemSuccess: "兌換成功！",
  },
  Balance_loges: {
    TypeName: {
      1: "普通聊天",
      2: "高級聊天",
      3: "Tokens",
      4: "繪圖",
    },
    SourceName: {
      1: "聊天消耗",
      2: "繪圖消耗",
      3: "後臺管理員操作",
      4: "註冊贈送",
    },
    Unknown: "未知",
    ChangeReason: "變更原因",
    SubscriptionID: "套餐ID",
    RecordDate: "僅展示最近30天的最近50條記錄",
  },
};

export default tw;

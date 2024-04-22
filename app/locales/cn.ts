import { getClientConfig } from "../config/client";
import { SubmitKey } from "../store/config";

const isApp = !!getClientConfig()?.isApp;

const cn = {
  PlugInName: "联网插件",
  DefaultChatName: "新的聊天",
  EnterInviteCode: "请输入邀请码！",
  Language: "zh-CN",
  WIP: "该功能仍在开发中……",
  Error: {
    Unauthorized: "登录信息已过期，请前往[登录页](/#/login)",
    Login: "您已登录，请点击下方「重试」按钮",
  },
  Auth: {
    Title: "需要密码",
    Tips: "管理员开启了密码验证，请在下方填入访问码",
    SubTips: "或者输入你的 OpenAI API 密钥",
    Input: "在此处填写访问码",
    Confirm: "确认",
    Later: "稍后再说",
  },
  Sidebar: {
    Title: "公告",
    Close: "关闭",
    synchronizing: "同步中...",
    SynchronizationSuccess: "同步成功！",
    SynchronizationFail: "同步失败，请重试。",
    SynchronizationError: "同步出现异常，请检查网络连接。",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} 条对话`,
  },
  Chat: {
    SubTitle: (count: number) => `共 ${count} 条对话`,
    UploadFailed: "上传失败！",
    EditMessage: {
      Title: "编辑消息记录",
      Topic: {
        Title: "聊天主题",
        SubTitle: "更改当前聊天主题",
      },
    },
    Actions: {
      ChatList: "查看消息列表",
      CompressedHistory: "查看压缩后的历史 Prompt",
      Export: "分享本页",
      Copy: "复制",
      Stop: "停止",
      Retry: "重试",
      Pin: "固定",
      PinToastContent: "已将 1 条对话固定至预设提示词",
      PinToastAction: "查看",
      Delete: "删除",
      Edit: "编辑",
    },
    Commands: {
      new: "新建聊天",
      newm: "选择应用新建聊天",
      next: "下一个聊天",
      prev: "上一个聊天",
      clear: "清除上下文",
      del: "删除聊天",
    },
    InputActions: {
      Stop: "停止响应",
      ToBottom: "滚到最新",
      Theme: {
        auto: "自动主题",
        light: "亮色模式",
        dark: "深色模式",
      },
      Prompt: "快捷指令",
      Masks: "所有应用",
      Clear: "清除聊天",
      Settings: "对话设置",
      Internet: "联网模式",
    },
    TooFrequently: "您发送太快啦，请稍后重试",
    Rename: "重命名对话",
    Typing: "正在输入…",
    SensitiveWordsTip: (question: string) =>
      `您的提问中包含敏感词：${question}`,
    BalanceNotEnough: "您的余额不足，请前往服务订阅充值！",
    Input: (submitKey: string, action: string, append?: boolean) => {
      var inputHints = `${submitKey} ${action}`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter 换行";
      }
      return inputHints + (append ? "，/ 触发补全，: 触发命令" : "");
    },
    Send: "发送",
    Draw: "绘画",
    Config: {
      Reset: "清除记忆",
      SaveAs: "存为应用",
      Confirm: "确定",
    },
    IsContext: "预设提示词",
    SessionLoading: "加载会话……",
    SessionLoadingError: (err: any) => "加载会话失败：" + err,
    ReloadSesison: "重新加载",
    DeleteDeletedSessionConfirm: "该会话已在其他客户端删除，确定删除本地会话？",
    ModelNotAvailable: "当前模型已不可用，请更换模型进行会话",
    PleaseWaitForFinished: "请等待本次请求结束或终止请求",
  },
  Midjourney: {
    Uploading: "上传中……",
    SelectImgMax: (max: number) => `最多可选择 ${max} 张图片`,
    InputDisabled: "该模式下不支持输入内容",
    NotSupports: "暂不支持此操作",
    HasImgTip:
      "提示：垫图模式/识图(describe)模式只会使用第一张图片，混图(blend)模式会按顺序使用选中的5张图片（点击图片可以移除）",
    ModeImagineUseImg: "垫图（图生图）模式",
    ModeBlend: "混图模式",
    ModeDescribe: "识图（图生文）模式",
    NeedInputUseImgPrompt: "垫图模式下需要输入内容才能使用图片，请输入内容",
    ImagineMaxImg: (max: number) => `垫图（图生图）模式下至多 ${max} 张图片`,
    gpt4vMaxImg: (max: number) => `该模式下至多 ${max} 张图片`,
    BlendMinImg: (min: number, max: number) =>
      `混图模式下至少需要 ${min} 张图片，至多 ${max} 张图片`,
    DescribeMaxImg: (max: number) => `识图（图生文）模式下至多 ${max} 张图片`,
    TaskErrUnknownType: "任务提交失败：未知的任务类型",
    TaskErrNotSupportType: (type: string) =>
      `任务提交失败：不支持的任务类型 -> ${type}`,
    StatusCode: (code: number) => `状态码：${code}`,
    TaskSubmitErr: (err: string) => `任务提交失败：${err}`,
    RespBody: (body: string) => `响应体：${body}`,
    None: "无",
    UnknownError: "未知错误",
    UnknownReason: "未知原因",
    TaskPrefix: (prompt: string, taskId: string) =>
      `**画面描述:** ${prompt}\n**任务ID:** ${taskId}\n`,
    PleaseWait: "请稍等片刻",
    TaskSubmitOk: "任务提交成功",
    TaskStatusFetchFail: "任务状态获取失败",
    TaskStatus: "任务状态",
    TaskRemoteSubmit: "任务已提交至绘图服务器",
    TaskProgressTip: (progress: number | undefined) =>
      `正在绘制${progress ? `，当前进度：${progress}%` : ""}`,
    TaskNotStart: "等待调度",
    Refresh: "获取最新进度",
    Url: "地址",
    SettingProxyCoverTip:
      "在此处定义的MidjourneyProxy地址会覆盖环境变量中的MIDJOURNEY_PROXY_URL",
    ImageAgent: "图像代理",
    ImageAgentOpenTip:
      "开启之后，返回的Midjourney图片将会通过本程序自身代理，所以本程序需要处于可以访问cdn.discordapp.com的网络环境中才有效",
  },
  Export: {
    Title: "分享聊天记录",
    Copy: "全部复制",
    Download: "下载文件",
    Share: "分享到 ShareGPT",
    MessageFromYou: "来自你的消息",
    MessageFromChatGPT: "来自 ChatGPT 的消息",
    Format: {
      Title: "导出格式",
      SubTitle: "可以导出 Markdown 文本或者 PNG 图片",
    },
    IncludeContext: {
      Title: "包含应用上下文",
      SubTitle: "是否在消息中展示应用上下文",
    },
    Steps: {
      Select: "选取",
      Preview: "预览",
    },
    Image: {
      Toast: "正在生成截图",
      Modal: "长按或右键保存图片",
    },
  },
  Select: {
    Search: "搜索消息",
    All: "选取全部",
    Latest: "最近几条",
    Clear: "清除选中",
  },
  Memory: {
    Title: "历史摘要",
    EmptyContent: "对话内容过短，无需总结",
    Send: "自动压缩聊天记录并作为上下文发送",
    Copy: "复制摘要",
    Reset: "[unused]",
    ResetConfirm: "确认清空历史摘要？",
    CloseConfirm: "您已修改部分配置项，确定不保存直接退出？",
    ConfirmText: "不保存直接退出",
  },
  Home: {
    NewChat: "新的聊天",
    DeleteChat: "确认删除选中的对话？",
    DeleteToast: "已删除会话",
    Revert: "撤销",
    NoNotice: "暂无公告",
    NoPopUP: "今日不再弹出",
  },
  LoginPage: {
    Title: "登录",
    SubTitle: "登陆后使用Kiwi Chat",
    Username: {
      Title: "用户名或邮箱",
      SubTitle: "",
      Placeholder: "请输入用户名或邮箱",
    },
    UsernameOrPhone: {
      Title: "用户名或手机号",
      SubTitle: "",
      Placeholder: "请输入用户名或手机号",
    },
    Password: {
      Title: "密码",
      SubTitle: "",
      Placeholder: "请输入密码",
    },
    Actions: {
      Close: "关闭",
      Login: "登录",
      Logout: "退出登录",
      Logingout: "退出中……",
    },
    Toast: {
      Success: "登录成功，正在同步会话信息",
      Logining: "登录中……",
      EmptyUserName: "用户名或邮箱不能为空",
      EmptyPassword: "密码不能为空！",
    },
    GoToRegister: "前往注册",
    ForgetPassword: "忘记/重置密码",
    FetchingSessions: "获取会话中……",
  },
  RegisterPage: {
    Agree: "同意",
    TermsOfUse: "用户协议",
    ViewTOS: "访问用户协议",
    Title: "注册",
    SubTitle: "注册后赠送免费额度哦",
    Name: {
      Title: "昵称",
      SubTitle: "",
      Placeholder: "请输入昵称，可不填",
    },
    Email: {
      Title: "邮箱",
      SubTitle: "",
      Placeholder: "请输入邮箱",
    },
    EmailCode: {
      Title: "验证码",
      SubTitle: "系统将向您邮箱发送的验证码",
      Placeholder: "请输入验证码",
    },
    Phone: {
      Title: "手机号",
      SubTitle: "",
      Placeholder: "请输入手机号",
    },
    PhoneCode: {
      Title: "验证码",
      SubTitle: "系统将向您手机号发送的短信验证码",
      Placeholder: "请输入短信验证码",
    },
    Username: {
      Title: "用户名",
      SubTitle: "用户名仅限字母/数字/下划线",
      Placeholder: "请输入用户名",
    },
    Password: {
      Title: "密码",
      SubTitle: "",
      Placeholder: "请输入密码",
    },
    ConfirmedPassword: {
      Title: "确认密码",
      SubTitle: "",
      Placeholder: "请再次输入密码",
    },
    Actions: {
      Close: "关闭",
    },
    Toast: {
      MustAgreeToTerms: "请同意并勾选服务条款",
      Success: "注册成功，正在前往聊天……",
      Registering: "注册中……",
      Failed: "注册失败！",
      FailedWithReason: "注册失败！原因：",
      PasswordNotTheSame: "两次输入的密码不一致！",
      PasswordEmpty: "密码不能为空！",
      SendEmailCode: "发送验证码",
      EmailCodeSending: "验证码发送中",
      EmailCodeSent: "验证码已发送，请查看邮箱",
      EmailIsEmpty: "请输入邮箱",
      EmailCodeSentFrequently: "验证码发送过于频繁，请稍后再试",
      EmailFormatError: "邮箱格式不正确",
      EmailCodeEmpty: "请输入邮箱验证码",
      EmailExistsError: "该邮箱已注册",
      SendPhoneCode: "发送短信验证码",
      PhoneCodeSending: "验证码发送中",
      PhoneCodeSent: "验证码已发送，请查看短信",
      PhoneIsEmpty: "请输入手机号",
      PhoneCodeSentFrequently: "验证码发送过于频繁，请稍后再试",
      PhoneFormatError: "手机号格式不正确",
      PhoneCodeEmpty: "请输入短信验证码",
      PhoneExistsError: "该手机号已注册",
    },
    GoToLogin: "前往登录",
    Captcha: "",
    CaptchaTitle: "点击刷新验证码",
    CaptchaIsEmpty: "请输入图形验证码",
    CaptchaLengthError: "图形验证码长度不正确",
    CaptchaInput: {
      Title: "图形验证码",
      SubTitle: "",
      Placeholder: "请输入图中的验证码",
    },
  },
  ForgetPasswordPage: {
    Title: "重置密码",
    SubTitle: "",
    Toast: {
      PasswordResetting: "重置密码中",
      PasswordResetFailed: "重置密码失败！",
      PasswordResetSuccess: "重置成功，正在前往聊天……",
      PasswordResetFailedWithReason: "重置失败！原因：",
    },
    Actions: {
      Close: "关闭",
    },
  },
  Profile: {
    EarliestDueOrder: "以上仅展示最早到期的套餐",
    InvalidOrder: "您所购套餐已经全部过期",
    EmptyOrder: "您尚未购买任何套餐",
    Loading: "加载中...",
    Title: "个人中心",
    SubTitle: "个人中心",
    Username: "账号",
    Email: "邮箱",
    Phone: "手机号",
    Invitor: {
      Title: "邀请人",
      Record: "邀请记录",
    },
    InviteCode: {
      RecordTitle: "邀请记录",
      RecordSubTitle: "查看所有邀请记录",
      Title: "邀请码(选填)",
      TitleRequired: "邀请码(必填)",
      Placeholder: "输入邀请码获得额外权益",
    },
    Tokens: {
      Title: "Tokens",
      SubTitle: "",
    },
    ChatCount: {
      Title: "基础聊天积分",
      SubTitle: "",
    },
    AdvanceChatCount: {
      Title: "高级聊天积分",
      SubTitle: "",
    },
    DrawCount: {
      Title: "绘图积分",
      SubTitle: "",
    },
    Actions: {
      Close: "关闭",
      Pricing: "购买套餐",
      Order: "订单中心",
      BalanceLog: "额度变动记录",
      GoToBalanceList: "更多",
      ConsultAdministrator: "请咨询站长",
      All: "所有套餐",
      CreateInviteCode: "生成邀请码",
      Copy: "复制链接",
      Redeem: "兑换码",
      RedeemTitle: "兑换码",
      RedeemSubTitle: "输入兑换码兑换套餐",
    },
    BalanceItem: {
      Title: "套餐类型",
      SubTitle: "",
      CalcTypes: {
        Total: "总额",
        Daily: "每天",
        Hourly: "每小时",
        ThreeHourly: "每3小时",
      },
    },
    ExpireList: {
      Title: "到期时间",
      Total: "总额",
      SubTitle: "",
    },
  },
  RedeemCodePage: {
    RedeemedTime: "兑换时间：",
    NoRedeemed: "暂未兑换",
    Loading: "加载中……",
    Title: "兑换码",
    RedeemCodeInput: {
      Title: "兑换码",
      Placeholder: "请输入兑换码",
    },
    Actions: {
      Close: "关闭",
      Redeem: "开始兑换",
    },
  },
  PricingPage: {
    QA: "常见问题",
    PointsFee: "积分计费：",
    PointsDesc:
      "积分计费是一种按次付费的计费方式，您可以根据需求购买不同数量的积分包，倍率为1倍的情况下1个积分为1次对话次数。积分分为基础、高级、绘画三类。\n" +
      "                            基础积分可以使用中国国产大模型，高级积分可以使用ChatGPT4等高级模型，绘画积分用于绘画。",
    PointsFactor: "积分倍率：",
    PointsFactorDesc:
      "如没有特殊标明则默认为1倍率，其他倍率可以在模型列表查看。",
    CS: "客服：",
    WechatCS: "微信客服：",
    WhatsAppCS: "WhatsApp客服：",
    EmailCS: "邮箱客服：",
    Discount: "关于优惠：",
    DiscountDesc: "本站不定期推出优惠活动，请关注",
    PricingHeaderTitle: "💡 常见问题滑动到底部查看",
    PricingHeaderSubTitle:
      "充值后请耐心等待 5-10 分钟左右到账，如有问题请联系客服(底部查看)",
    BaseCurrency: "人民幣結算",
    ClickToPay: "点此付款",
    PaymentPrompt: "订单已创建，请点击以下按钮前往付款（微信支付）",
    PricingPageTitle: "套餐购买",
    PricingPageSubTitle1: "其他支付方式请到",
    PricingPageSubTitle2: "兑换",
    PricingPageUrlTitle: "兑换页面",
    CurrencySymbol: "￥",
    Title: "充值",
    SubTitle: "畅享与AI聊天的乐趣",
    Actions: {
      Close: "关闭",
      Buy: " 微信购买 ",
      Order: "订单中心",
      RedeemCode: "兑换码",
    },
    NoPackage: "暂无可用套餐",
    Loading: "请稍候……",
    PleaseLogin: "请先登录",
    ConsultAdministrator: "请咨询站长",
    BuyFailedCause: "套餐购买失败！原因：",
    TOO_FREQUENCILY: "操作过于频繁，请稍后再试",
    CREATE_ORDER_FAILED: "创建订单失败",
    ChoosePayChannel: "请选择支付方式",
  },
  PayPage: {
    DefaultName: "套餐购买",
    CurrentOrder: "当前订单：",
    OrderStatus: {
      unsubmitted: "未提交",
      awaitingPayment: "待支付",
      timeout: "已超时",
      submissionFailed: "提交失败",
      paid: "已支付",
      paymentFailed: "支付失败",
      cancelled: "已取消",
      deleted: "已删除",
    },
    PayPrompt: "请使用微信扫码支付",
    PayTittle: "订单支付",
    PaidSuccess: "支付成功",
    Actions: {
      Close: "关闭",
    },
  },
  BalancePage: {
    Title: "已购套餐",
    NoBalance: "您尚未购买任何套餐",
    Loading: "请稍候……",
    Actions: {
      Close: "关闭",
      Pricing: "购买套餐",
      Order: "订单中心",
      Profile: "个人中心",
      Refresh: "刷新",
      Refreshing: "刷新中……",
      RedeemCode: "兑换码",
      BalanceLog: "额度变动记录",
    },
    Footer: {
      Note: "仅展示最近30天的最近50条记录",
    },
  },
  InvitationPage: {
    Title: "邀请记录",
    NoInvitation: "快将邀请链接分享给朋友吧",
    Loading: "请稍候……",
    Actions: {
      Close: "关闭",
      Profile: "个人中心",
      Refresh: "刷新",
      Refreshing: "刷新中……",
    },
  },
  BalanceLogPage: {
    Title: "额度变动记录",
    NoBalance: "暂无记录",
    Loading: "请稍候……",
    Actions: {
      Close: "关闭",
      Profile: "个人中心",
      Refresh: "刷新",
      Refreshing: "刷新中……",
      Balance: "所有套餐",
    },
  },
  OrderPage: {
    PP: "套餐购买：",
    PaymentTime: "支付时间：",
    CreatTime: "创建时间：",
    OrderNum: "订单号：……",
    Status: "状态：",
    CurrencySymbol: "￥",
    Title: "订单中心",
    NoOrder: "暂无订单",
    Loading: "请稍候……",
    StateError: "状态错误！",
    CancelFailedForStateError: "当前状态下无法取消",
    CancelSuccess: "订单取消成功",
    CancelFailure: "订单取消失败",
    TryAgainLaster: "操作失败，请稍候重试",
    PleaseWaitForDataSync:
      "数据可能延迟，支付成功请在10分钟后查看订单状态，请勿重复支付",
    Actions: {
      Pay: "支付",
      Cancel: "取消",
      Pricing: "购买套餐",
      Profile: "个人中心",
      Copy: "复制",
      Refresh: "刷新",
      Refreshing: "刷新中……",
    },
  },
  Settings: {
    Title: "设置",
    SubTitle: "所有设置选项",
    Danger: {
      Reset: {
        Title: "重置所有设置",
        SubTitle: "重置所有设置项恢复默认值",
        Action: "立即重置",
        Confirm: "确认重置所有设置？",
      },
      Clear: {
        Title: "清除所有数据",
        SubTitle: "清除所有聊天、设置数据",
        Action: "立即清除",
        Confirm: "确认清除所有聊天、设置数据？",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "所有语言",
    },
    Avatar: "头像",
    FontSize: {
      Title: "字体大小",
      SubTitle: "聊天内容的字体大小",
    },
    InjectSystemPrompts: {
      Title: "注入系统级提示信息",
      SubTitle: "强制给每次请求的消息列表开头添加一个模拟 ChatGPT 的系统提示",
    },
    InputTemplate: {
      Title: "用户输入预处理",
      SubTitle: "用户最新的一条消息会填充到此模板",
    },

    Update: {
      Version: (x: string) => `当前版本：${x}`,
      IsLatest: "已是最新版本",
      CheckUpdate: "检查更新",
      IsChecking: "正在检查更新...",
      FoundUpdate: (x: string) => `发现新版本：${x}`,
      GoToUpdate: "前往更新",
    },
    SendKey: "发送键",
    Theme: "主题",
    TightBorder: "无边框模式",
    SendPreviewBubble: {
      Title: "预览气泡",
      SubTitle: "在预览气泡中预览 Markdown 内容",
    },
    AutoGenerateTitle: {
      Title: "自动生成标题",
      SubTitle: "根据对话内容生成合适的标题",
    },
    Sync: {
      CloudState: "云端数据",
      NotSyncYet: "还没有进行过同步",
      Success: "同步成功",
      Fail: "同步失败",

      Config: {
        Modal: {
          Title: "配置云同步",
          Check: "检查可用性",
        },
        SyncType: {
          Title: "同步类型",
          SubTitle: "选择喜爱的同步服务器",
        },
        Proxy: {
          Title: "启用代理",
          SubTitle: "在浏览器中同步时，必须启用代理以避免跨域限制",
        },
        ProxyUrl: {
          Title: "代理地址",
          SubTitle: "仅适用于本项目自带的跨域代理",
        },

        WebDav: {
          Endpoint: "WebDAV 地址",
          UserName: "用户名",
          Password: "密码",
        },

        UpStash: {
          Endpoint: "UpStash Redis REST Url",
          UserName: "备份名称",
          Password: "UpStash Redis REST Token",
        },
      },

      LocalState: "本地数据",
      Overview: (overview: any) => {
        return `${overview.chat} 次对话，${overview.message} 条消息，${overview.prompt} 条提示词，${overview.mask} 个面具`;
      },
      ImportFailed: "导入失败",
    },
    Mask: {
      Splash: {
        Title: "应用启动页",
        SubTitle: "新建聊天时，展示应用启动页",
      },
      Builtin: {
        Title: "隐藏内置应用",
        SubTitle: "在所有面具列表中隐藏内置应用",
      },
    },
    Prompt: {
      Disable: {
        Title: "禁用提示词自动补全",
        SubTitle: "在输入框开头输入 / 即可触发自动补全",
      },
      List: "自定义提示词列表",
      ListCount: (builtin: number, custom: number) =>
        `内置 ${builtin} 条，用户定义 ${custom} 条`,
      Edit: "编辑",
      Modal: {
        Title: "提示词列表",
        Add: "新建",
        Search: "搜索提示词",
      },
      EditModal: {
        Title: "编辑提示词",
      },
    },
    HistoryCount: {
      Title: "附带历史消息数",
      SubTitle: "每次请求携带的历史消息数",
    },
    CompressThreshold: {
      Title: "历史消息长度压缩阈值",
      SubTitle: "当未压缩的历史消息超过该值时，将进行压缩",
    },

    Usage: {
      Title: "余额查询",
      SubTitle(used: any, total: any) {
        return `本月已使用 $${used}，订阅总额 $${total}`;
      },
      IsChecking: "正在检查…",
      Check: "重新检查",
      NoAccess: "输入 API Key 或访问密码查看余额",
    },

    Access: {
      AccessCode: {
        Title: "访问密码",
        SubTitle: "管理员已开启加密访问",
        Placeholder: "请输入访问密码",
      },
      CustomEndpoint: {
        Title: "自定义接口",
        SubTitle: "是否使用自定义 Azure 或 OpenAI 服务",
      },
      Provider: {
        Title: "模型服务商",
        SubTitle: "切换不同的服务商",
      },
      OpenAI: {
        ApiKey: {
          Title: "API Key",
          SubTitle: "使用自定义 OpenAI Key 绕过密码访问限制",
          Placeholder: "OpenAI API Key",
        },

        Endpoint: {
          Title: "接口地址",
          SubTitle: "除默认地址外，必须包含 http(s)://",
        },
      },
      Azure: {
        ApiKey: {
          Title: "接口密钥",
          SubTitle: "使用自定义 Azure Key 绕过密码访问限制",
          Placeholder: "Azure API Key",
        },

        Endpoint: {
          Title: "接口地址",
          SubTitle: "样例：",
        },

        ApiVerion: {
          Title: "接口版本 (azure api version)",
          SubTitle: "选择指定的部分版本",
        },
      },
      CustomModel: {
        Title: "自定义模型名",
        SubTitle: "增加自定义模型可选项，使用英文逗号隔开",
      },
    },

    Model: "模型 (model)",
    Temperature: {
      Title: "随机性 (temperature)",
      SubTitle: "值越大，回复越随机",
    },
    TopP: {
      Title: "核采样 (top_p)",
      SubTitle: "与随机性类似，但不要和随机性一起更改",
    },
    MaxTokens: {
      Title: "单次回复限制 (max_tokens)",
      SubTitle: "单次交互所用的最大 Token 数",
    },
    PresencePenalty: {
      Title: "话题新鲜度 (presence_penalty)",
      SubTitle: "值越大，越有可能扩展到新话题",
    },
    FrequencyPenalty: {
      Title: "频率惩罚度 (frequency_penalty)",
      SubTitle: "值越大，越有可能降低重复字词",
    },
    Version: {
      Title: "版本",
      SubTitle: "",
    },
  },
  Store: {
    DefaultTopic: "新的聊天",
    BotHello: "有什么可以帮你的吗",
    Error: "出错了，稍后重试吧",
    Prompt: {
      History: (content: string) => "这是历史聊天总结作为前情提要：" + content,
      Topic:
        "使用四到五个字直接返回这句话的简要主题，不要解释、不要标点、不要换行、不要语气词、不要多余文本，如果没有主题，请直接返回“闲聊”",
      Summarize:
        "简要总结一下对话内容，用作后续的上下文提示 prompt，控制在 200 字以内",
    },
  },
  Copy: {
    Success: "已写入剪切板",
    Failed: "复制失败，请赋予剪切板权限",
  },
  Download: {
    Success: "内容已下载到您的目录。",
    Failed: "下载失败。",
  },
  Context: {
    Toast: (x: any) => `包含 ${x} 条预设提示词`,
    Edit: "当前对话设置",
    Add: "新增一条对话",
    Clear: "上下文已清除",
    Revert: "恢复上下文",
  },
  Shop: {
    Name: "服务订阅",
  },
  User: {
    Name: "个人中心",
  },
  Sync: {
    Name: "同步对话",
  },
  Plugin: {
    Name: "插件管理",
    Enabled: "已开启",
    Disabled: "已关闭",
  },
  FineTuned: {
    Sysmessage: "你是一个助手",
  },
  Mask: {
    Name: "应用中心",
    Page: {
      Title: "应用中心",
      SubTitle: (count: number) => `${count} 个应用定义`,
      Search: "搜索应用",
      Create: "新建",
    },
    Item: {
      Info: (count: number) => `包含 ${count} 条预设对话`,
      Chat: "对话",
      View: "查看",
      Edit: "编辑",
      Delete: "删除",
      DeleteConfirm: "确认删除？",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `编辑预设应用 ${readonly ? "（只读）" : ""}`,
      Download: "下载预设",
      Clone: "克隆预设",
    },
    Config: {
      Avatar: "角色头像",
      Name: "角色名称",
      Description: {
        title: "角色描述",
        SubTitle: "仅限后台应用支持编辑",
      },
      Sync: {
        Title: "使用全局设置",
        SubTitle: "当前对话是否使用全局模型设置",
        Confirm: "当前对话的自定义设置将会被自动覆盖，确认启用全局设置？",
      },
      HideContext: {
        Title: "隐藏预设对话",
        SubTitle: "隐藏后预设对话不会出现在聊天界面",
      },
      Share: {
        Title: "分享此面具",
        SubTitle: "生成此面具的直达链接",
        Action: "复制链接",
      },
    },
  },
  NewChat: {
    Return: "返回",
    Skip: "直接开始",
    NotShow: "不再展示",
    ConfirmNoShow: "确认禁用？禁用后可以随时在设置中重新启用。",
    Title: "选择一个应用",
    SubTitle: "现在开始，使用人工智能的高级方法",
    More: "查看全部",
  },

  URLCommand: {
    Code: "检测到链接中已经包含访问码，是否自动填入？",
    Settings: "检测到链接中包含了预制设置，是否自动填入？",
  },

  UI: {
    Confirm: "确认",
    Cancel: "取消",
    Close: "关闭",
    Create: "新建",
    Edit: "编辑",
    Export: "导出",
    Import: "导入",
    Sync: "同步",
    Config: "配置",
  },
  Exporter: {
    Model: "模型",
    Messages: "消息",
    Topic: "主题",
    Time: "时间",
  },
  Balance: {
    prefix: {
      1: "总额剩余",
      2: "每天",
      3: "每小时",
      4: "每3小时",
    },
    tokens: "Tokens",
    basicChatPoints: "基础聊天积分",
    advancedChatPoints: "高级聊天积分",
    drawingPoints: "绘画积分",
    expirationTime: "到期时间",
    unlimited: "无限",
    days: "天",
  },
  OrderState: {
    0: "待提交",
    5: "待支付",
    6: "提交失败",
    10: "已支付",
    12: "支付失败",
    20: "已取消",
    30: "已删除",
    paymentTimeout: "支付超时",
  },
  TransactionType: {
    exchange: "兑换",
    purchase: "购买",
  },
  Labels: {
    transactionTime: "时间：",
  },
  Messages: {
    enterRedeemCode: "请输入兑换码！",
  },
  Errors: {
    unknownError: "未知错误",
    redeemFailed: "兑换失败：",
    invalidCode: "兑换失败：兑换码无效",
    codeNotEffective: "兑换失败：兑换码未生效",
    codeRedeemed: "兑换失败：兑换码已兑换",
    requestFailed: "请求失败",
  },
  Success: {
    redeemSuccess: "兑换成功！",
  },
  Balance_loges: {
    TypeName: {
      1: "普通聊天",
      2: "高级聊天",
      3: "Tokens",
      4: "绘图",
    },
    SourceName: {
      1: "聊天消耗",
      2: "绘图消耗",
      3: "后台管理员操作",
      4: "注册赠送",
    },
    Unknown: "未知",
    ChangeReason: "变更原因",
    SubscriptionID: "套餐ID",
    RecordDate: "仅展示最近30天的最近50条记录",
  },
  Assistant: {
    Name: "助手:",
    CodeInterpreter: "调用代码解释器：",
    Status: {
      init: "正在初始化",
      queued: "已进入队列",
      in_progress: "思考中",
      requires_action: "等待工具返回结果",
      cancelling: "取消中",
      cancelled: "已取消",
      failed: "思考失败",
      completed: "思考完成",
      expired: "思考时间过长",
    },
  },
};

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type LocaleType = typeof cn;
export type PartialLocaleType = DeepPartial<typeof cn>;

export default cn;

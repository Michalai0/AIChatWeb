import { getClientConfig } from "../config/client";
import { SubmitKey } from "../store/config";
import { LocaleType } from "./index";

// if you are adding a new translation, please use PartialLocaleType instead of LocaleType

const isApp = !!getClientConfig()?.isApp;
const en: LocaleType = {
  PlugInName: "Network Plug_In",
  DefaultChatName: "New Chat",
  EnterInviteCode: "Please enter an invite code!",
  Language: "en-HK",
  WIP: "Coming Soon...",
  Error: {
    Unauthorized:
      "Login information has expired, please go to [login page](/#/login)",
    Login: 'You are logged in, please click the "Retry" button below',
  },
  Auth: {
    Title: "Need Access Code",
    Tips: "Please enter access code below",
    SubTips: "Or enter your OpenAI API Key",
    Input: "access code",
    Confirm: "Confirm",
    Later: "Later",
  },
  Sidebar: {
    Title: "Announcement",
    Close: "Close",
    synchronizing: "Synchronizing...",
    SynchronizationSuccess: "Synchronization successful!",
    SynchronizationFail: "Synchronization failed, please try again.",
    SynchronizationError:
      "An error occurred during synchronization, please check your network connection.",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} messages`,
  },
  Chat: {
    SubTitle: (count: number) => `${count} messages`,
    UploadFailed: "Upload failed!",
    EditMessage: {
      Title: "Edit All Messages",
      Topic: {
        Title: "Topic",
        SubTitle: "Change the current topic",
      },
    },
    Actions: {
      ChatList: "Go To Chat List",
      CompressedHistory: "Compressed History Memory Prompt",
      Export: "Export All Messages as Markdown",
      Copy: "Copy",
      Stop: "Stop",
      Retry: "Retry",
      Pin: "Pin",
      PinToastContent: "Pinned 1 messages to contextual prompts",
      PinToastAction: "View",
      Delete: "Delete",
      Edit: "Edit",
    },
    Commands: {
      new: "Start a new chat",
      newm: "Start a new chat with mask",
      next: "Next Chat",
      prev: "Previous Chat",
      clear: "Clear Context",
      del: "Delete Chat",
    },
    InputActions: {
      Stop: "Stop",
      ToBottom: "To Latest",
      Theme: {
        auto: "Auto",
        light: "Light Theme",
        dark: "Dark Theme",
      },
      Prompt: "Prompts",
      Masks: "Masks",
      Clear: "Clear Context",
      Settings: "Settings",
      Internet: "Access Internet",
    },
    TooFrequently: "You are sending too fast, please try again later",
    Rename: "Rename Chat",
    Typing: "Typing…",
    SensitiveWordsTip: (question: string) =>
      `Your question contains sensitive words:${question}`,
    BalanceNotEnough:
      "Your balance is insufficient, please go to Subscribe to top up!\n",
    Input: (submitKey: string, action: string, append?: boolean) => {
      var inputHints = `${submitKey} to ${action}`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += ", Shift + Enter to wrap";
      }
      return (
        inputHints + (append ? ", / to search prompts, : to use commands" : "")
      );
    },
    Send: "Send",
    Draw: "Draw",
    Config: {
      Reset: "Reset to Default",
      SaveAs: "Save as Mask",
      Confirm: "Confirm",
    },
    IsContext: "Contextual Prompt",
    SessionLoading: "session loading...",
    SessionLoadingError: (err: any) => "Loading session failed: " + err,
    ReloadSesison: "Reload Session",
    DeleteDeletedSessionConfirm:
      "This session has been deleted by other client. Do you want to delete it from local storage?",
    ModelNotAvailable:
      "Current model is not available. Please Change the model for chatting",
    PleaseWaitForFinished:
      "Please wait for the request finished or terminate it.",
  },
  Midjourney: {
    Uploading: "Uploading...",
    SelectImgMax: (max: number) => `Select up to ${max} images`,
    InputDisabled: "Input is disabled in this mode",
    NotSupports: "not supports",
    HasImgTip:
      "Tip: In the mask mode, only the first image will be used. In the blend mode, the five selected images will be used in order (click the image to remove it)",
    ModeImagineUseImg: "Mask Mode",
    ModeBlend: "Blend Mode",
    ModeDescribe: "Describe Mode",
    NeedInputUseImgPrompt:
      "You need to enter content to use the image in the mask mode, please input the content",
    ImagineMaxImg: (max: number) =>
      `up to ${max} iamges are required in the Mask mode`,
    gpt4vMaxImg: (max: number) =>
      `up to ${max} iamges are required in this mode`,
    BlendMinImg: (min: number, max: number) =>
      `At least ${min} images are required in the mixed image mode, and up to ${max} images are required`,
    DescribeMaxImg: (max: number) =>
      `up to ${max} iamges are required in the describe mode`,
    TaskErrUnknownType: "Task submission failed: unknown task type",
    TaskErrNotSupportType: (type: string) =>
      `Task submission failed: unsupported task type -> ${type}`,
    StatusCode: (code: number) => `Status code: ${code}`,
    TaskSubmitErr: (err: string) => `Task submission failed: ${err}`,
    RespBody: (body: string) => `Response body: ${body}`,
    None: "None",
    UnknownError: "Unknown error",
    UnknownReason: "Unknown reason",
    TaskPrefix: (prompt: string, taskId: string) =>
      `**Prompt:** ${prompt}\n**Task ID:** ${taskId}\n`,
    PleaseWait: "Please wait a moment",
    TaskSubmitOk: "Task submitted successfully",
    TaskStatusFetchFail: "Failed to get task status",
    TaskStatus: "Task status",
    TaskRemoteSubmit: "Task has been submitted to Midjourney server",
    TaskProgressTip: (progress: number | undefined) =>
      `Drawing${progress ? `, current progress: ${progress}%` : ""}`,
    TaskNotStart: "Task has not started",
    Refresh: "Refresh",
    Url: "URL",
    SettingProxyCoverTip:
      "The MidjourneyProxy address defined here will override the MIDJOURNEY_PROXY_URL in the environment variables",
    ImageAgent: "Image Agent",
    ImageAgentOpenTip:
      "After turning it on, the returned Midjourney image will be proxied by this program itself, so this program needs to be in a network environment that can access cdn.discordapp.com to be effective",
  },
  Export: {
    Title: "Export Messages",
    Copy: "Copy All",
    Download: "Download",
    MessageFromYou: "Message From You",
    MessageFromChatGPT: "Message From ChatGPT",
    Share: "Share to ShareGPT",
    Format: {
      Title: "Export Format",
      SubTitle: "Markdown or PNG Image",
    },
    IncludeContext: {
      Title: "Including Context",
      SubTitle: "Export context prompts in mask or not",
    },
    Steps: {
      Select: "Select",
      Preview: "Preview",
    },
    Image: {
      Toast: "Capturing Image...",
      Modal: "Long press or right click to save image",
    },
  },
  Select: {
    Search: "Search",
    All: "Select All",
    Latest: "Select Latest",
    Clear: "Clear",
  },
  Memory: {
    Title: "Memory Prompt",
    EmptyContent: "Nothing yet.",
    Send: "Send Memory",
    Copy: "Copy Memory",
    Reset: "Reset Session",
    ResetConfirm:
      "Resetting will clear the current conversation history and historical memory. Are you sure you want to reset?",
    CloseConfirm:
      "You have changed some items. Are you sure quit without saving?",
    ConfirmText: "Exit without saving",
  },
  Home: {
    NewChat: "New Chat",
    DeleteChat: "Confirm deletion of selected conversation?",
    DeleteToast: "Deleting conversation",
    Revert: "Undo",
    NoNotice: "No notice for now",
    NoPopUP: "No more popups for today",
  },
  LoginPage: {
    Title: "Login",
    SubTitle: "Log in to use Kiwi Chat",
    Username: {
      Title: "Username or Email",
      SubTitle: "",
      Placeholder: "Username or Email",
    },
    UsernameOrPhone: {
      Title: "Username or Phone Number",
      SubTitle: "",
      Placeholder: "Please enter a username or cell phone number",
    },
    Password: {
      Title: "Password",
      SubTitle: "",
      Placeholder: "Please enter your password",
    },
    Actions: {
      Close: "Close",
      Login: "Log in",
      Logingout: "Logging out",
      Logout: "Log out",
    },
    Toast: {
      Success: "Login was successful, synchronizing session information",
      Logining: "Logging in ......",
      EmptyUserName: "Username or email cannot be empty!",
      EmptyPassword: "Password cannot be empty!",
    },
    GoToRegister: "Go to register",
    ForgetPassword: "Forget/Reset Password",
    FetchingSessions: "Fetching sessions in ......",
  },
  RegisterPage: {
    Agree: "Agree",
    TermsOfUse: "Terms of Service",
    ViewTOS: "View Terms of Service",
    Title: "Sign Up",
    SubTitle: "Sign up for free credits",
    Name: {
      Title: "Nickname",
      SubTitle: "",
      Placeholder: "Enter a nickname, optional",
    },
    Email: {
      Title: "Email",
      SubTitle: "",
      Placeholder: "Enter your email",
    },
    EmailCode: {
      Title: "Verification Code",
      SubTitle: "A verification code will be sent to your email",
      Placeholder: "Enter the verification code",
    },
    Phone: {
      Title: "Phone Number",
      SubTitle: "",
      Placeholder: "Enter your phone number",
    },
    PhoneCode: {
      Title: "Verification Code",
      SubTitle:
        "A text message with a verification code will be sent to your phone",
      Placeholder: "Enter the SMS verification code",
    },
    Username: {
      Title: "Username",
      SubTitle: "Letters/Numbers/Underscores only.",
      Placeholder: "Enter your username",
    },
    Password: {
      Title: "Password",
      SubTitle: "",
      Placeholder: "Enter your password",
    },
    ConfirmedPassword: {
      Title: "Confirm Password",
      SubTitle: "",
      Placeholder: "Enter your password again",
    },
    Actions: {
      Close: "Close",
    },
    Toast: {
      MustAgreeToTerms: "Please agree and check the Terms of Service",
      Success: "Registration successful, proceeding to chat...",
      Registering: "Registering...",
      Failed: "Registration failed!",
      FailedWithReason: "Registration failed! Reason:",
      PasswordNotTheSame: "The passwords entered do not match!",
      PasswordEmpty: "Password cannot be empty!",
      SendEmailCode: "Send Verification Code",
      EmailCodeSending: "Sending Verification Code",
      EmailCodeSent: "Verification code sent, please check your email",
      EmailIsEmpty: "Please enter an email",
      EmailCodeSentFrequently:
        "Verification code sent too frequently, please try again later",
      EmailFormatError: "Invalid email format",
      EmailCodeEmpty: "Please enter the email verification code",
      EmailExistsError: "This email has already been registered",
      SendPhoneCode: "Send SMS Verification Code",
      PhoneCodeSending: "Sending Verification Code",
      PhoneCodeSent: "Verification code sent, please check your SMS",
      PhoneIsEmpty: "Please enter your phone number",
      PhoneCodeSentFrequently:
        "Verification code sent too frequently, please try again later",
      PhoneFormatError: "Invalid phone number format",
      PhoneCodeEmpty: "Please enter the SMS verification code",
      PhoneExistsError: "This phone number has already been registered",
    },
    GoToLogin: "Go to Login",
    Captcha: "",
    CaptchaTitle: "Click to refresh the captcha",
    CaptchaIsEmpty: "Please enter the captcha",
    CaptchaLengthError: "Incorrect captcha length",
    CaptchaInput: {
      Title: "Captcha",
      SubTitle: "",
      Placeholder: "Please enter the captcha shown in the image",
    },
  },
  ForgetPasswordPage: {
    Title: "Reset Password",
    SubTitle: "",
    Toast: {
      PasswordResetting: "Resetting password",
      PasswordResetFailed: "Password reset failed!",
      PasswordResetSuccess: "Reset successful, proceeding to chat...",
      PasswordResetFailedWithReason: "Reset failed! Reason:",
    },
    Actions: {
      Close: "Close",
    },
  },
  Profile: {
    EarliestDueOrder:
      "The above only displays the earliest expiring subscription",
    InvalidOrder: "All the subscription you have purchased have expired",
    EmptyOrder: "You have not purchased any subscription",
    Loading: "Loading...",
    Title: "Profile",
    SubTitle: "Profile",
    Username: "Account",
    Email: "Email",
    Phone: "Phone Number",
    Invitor: {
      Title: "Inviter",
      Record: "Invitation Record",
    },
    InviteCode: {
      RecordTitle: "Invitation Records",
      RecordSubTitle: "View all Invitation Records",
      Title: "Invite Code (Optional)",
      TitleRequired: "Invite Code (Required)",
      Placeholder:
        "Enter inv\n" + "    Tokens: {ite code for additional benefits",
    },
    Tokens: {
      Title: "Tokens",
      SubTitle: "",
    },
    ChatCount: {
      Title: "Basic Chat Points",
      SubTitle: "",
    },
    AdvanceChatCount: {
      Title: "Advanced Chat Points",
      SubTitle: "",
    },
    DrawCount: {
      Title: "Drawing Points",
      SubTitle: "",
    },
    Actions: {
      Close: "Close",
      Pricing: "Purchase Subscriptions",
      Order: "Order Center",
      BalanceLog: "Balance Change Log",
      GoToBalanceList: "More",
      ConsultAdministrator: "Contact Administrator",
      All: "All Subscriptions",
      CreateInviteCode: "Generate Invite Code",
      Copy: "Copy Link",
      Redeem: "Redeem Code",
      RedeemTitle: "Redeem Code",
      RedeemSubTitle: "Enter the redemption code to redeem the subscription",
    },
    BalanceItem: {
      Title: "Subscription Type",
      SubTitle: "",
      CalcTypes: {
        Total: "Total",
        Daily: "Daily",
        Hourly: "Hourly",
        ThreeHourly: "Every 3 Hours",
      },
    },
    ExpireList: {
      Total: "Total",
      Title: "Expiration Date",
      SubTitle: "",
    },
  },
  RedeemCodePage: {
    RedeemedTime: "Redeemed Time:",
    NoRedeemed: " Not yet redeemed",
    Loading: "Loading...",
    Title: "Redeem Code",
    RedeemCodeInput: {
      Title: "Redeem Code",
      Placeholder: "Enter redeem code",
    },
    Actions: {
      Close: "Close",
      Redeem: "Start Redemption",
    },
  },
  PricingPage: {
    QA: "FAQ",
    PointsFee: "Chat Points: ",
    PointsDesc:
      "Points billing is a pay-per-use billing method, you can buy different number of points packs according to your needs, 1 point for 1 conversation if the multiplier is 1x. Points are divided into three categories: Basic, Advanced and Drawing. \n" +
      " Basic points can be used for Chinese domestic models, advanced points can be used for advanced models such as ChatGPT4..., and drawing points are used for drawing.",
    PointsFactor: "Points factor: ",
    PointsFactorDesc:
      "If not marked otherwise it is defaulted to 1, other factors can be viewed in the model list.",
    CS: "Customer Service: ",
    WechatCS: "WeChat: ",
    WhatsAppCS: "WhatsApp: ",
    EmailCS: "Email: ",
    Discount: "Discount：",
    DiscountDesc:
      "This site from time to time to launch promotional activities, please pay attention to the",
    PricingHeaderTitle: "💡 FAQ Slide to the bottom to view",
    PricingHeaderSubTitle:
      "Funds will appear within 5-10 minutes post-recharge. For help, contact customer service below.",
    BaseCurrency: "Settlement in CNY",
    ClickToPay: "Click to Pay",
    PaymentPrompt:
      "Order has been created, please click the button below to proceed to payment (WeChat Pay)",
    PricingPageTitle: "Subscriptions Purchase",
    PricingPageSubTitle1: "Other Payment Methods Please Go To ",
    PricingPageSubTitle2: " Redeem",
    PricingPageUrlTitle: "Redemption Page",
    CurrencySymbol: "￥",
    Title: "Recharge",
    SubTitle: "Enjoy the fun of chatting with AI",
    Actions: {
      Close: "Close",
      Buy: "WeChat Pay",
      Order: "Order Center",
      RedeemCode: "Redeem Code",
    },
    NoPackage: "No Subscriptions available",
    Loading: "Please wait...",
    PleaseLogin: "Please log in first",
    ConsultAdministrator: "Please consult the site administrator",
    BuyFailedCause: "Failed to purchase Subscription! Reason:",
    TOO_FREQUENCILY: "Operation too frequent, please try again later",
    CREATE_ORDER_FAILED: "Failed to create order",
    ChoosePayChannel: "Please select a payment method",
  },
  PayPage: {
    DefaultName: " Subscription Purchased",
    CurrentOrder: "Current Order:",
    OrderStatus: {
      unsubmitted: "Unsubmitted",
      awaitingPayment: "Awaiting Payment",
      timeout: "Timed Out",
      submissionFailed: "Submission Failed",
      paid: "Paid",
      paymentFailed: "Payment Failed",
      cancelled: "Cancelled",
      deleted: "Deleted",
    },
    PayPrompt: "Please use WeChat to scan and pay",
    PayTittle: "Order Payment",
    PaidSuccess: "Payment Successful",
    Actions: {
      Close: "Close",
    },
  },
  BalancePage: {
    Title: "Purchased Subscriptions",
    NoBalance: "You have not purchased any Subscriptions",
    Loading: "Please wait...",
    Actions: {
      Close: "Close",
      Pricing: "Purchase Subscriptions",
      Order: "Order Center",
      Profile: "Profile",
      Refresh: "Refresh",
      Refreshing: "Refreshing...",
      RedeemCode: "Redeem Code",
      BalanceLog: "Balance Change Log",
    },
    Footer: {
      Note: "Only the latest 50 records from the past 30 days are displayed",
    },
  },
  InvitationPage: {
    Title: "Invitation Record",
    NoInvitation: "Hurry and share the invitation link with your friends",
    Loading: "Please wait...",
    Actions: {
      Close: "Close",
      Profile: "Profile",
      Refresh: "Refresh",
      Refreshing: "Refreshing...",
    },
  },
  BalanceLogPage: {
    Title: "Balance Change Log",
    NoBalance: "No records available",
    Loading: "Please wait...",
    Actions: {
      Close: "Close",
      Profile: "Profile",
      Refresh: "Refresh",
      Refreshing: "Refreshing...",
      Balance: "All Subscriptions",
    },
  },
  OrderPage: {
    PP: " Subscription Purchased: ",
    PaymentTime: "Payment Time: ",
    CreatTime: "Creation Time: ",
    OrderNum: "Order Number: ...",
    Status: "Status: ",
    CurrencySymbol: "￥ ",
    Title: "Order Center",
    NoOrder: "No orders available",
    Loading: "Please wait...",
    StateError: "Status error!",
    CancelFailedForStateError: "Cannot cancel due to current status",
    CancelSuccess: "Order successfully cancelled",
    CancelFailure: "Order cancellation failed",
    TryAgainLaster: "Operation failed, please try again later",
    PleaseWaitForDataSync:
      "Data may be delayed. If payment is successful, please check the order status after 10 minutes and avoid duplicate payments",
    Actions: {
      Pay: "Pay",
      Cancel: "Cancel",
      Pricing: "Purchase Subscriptions",
      Profile: "Profile",
      Copy: "Copy",
      Refresh: "Refresh",
      Refreshing: "Refreshing...",
    },
  },
  Settings: {
    Title: "Settings",
    SubTitle: "All Settings",
    Danger: {
      Reset: {
        Title: "Reset All Settings",
        SubTitle: "Reset all settings to default",
        Action: "Reset",
        Confirm: "Confirm to reset all settings to default?",
      },
      Clear: {
        Title: "Clear All Data",
        SubTitle: "Clear all messages and settings",
        Action: "Clear",
        Confirm: "Confirm to clear all messages and settings?",
      },
    },
    Lang: {
      Name: "Language", // ATTENTION: if you wanna add a new translation, please do not translate this value, leave it as `Language`
      All: "All Languages",
    },
    Avatar: "Avatar",
    FontSize: {
      Title: "Font Size",
      SubTitle: "Adjust font size of chat content",
    },
    InjectSystemPrompts: {
      Title: "Inject System Prompts",
      SubTitle: "Inject a global system prompt for every request",
    },
    InputTemplate: {
      Title: "Input Template",
      SubTitle: "Newest message will be filled to this template",
    },

    Update: {
      Version: (x: string) => `Version: ${x}`,
      IsLatest: "Latest version",
      CheckUpdate: "Check Update",
      IsChecking: "Checking update...",
      FoundUpdate: (x: string) => `Found new version: ${x}`,
      GoToUpdate: "Update",
    },
    SendKey: "Send Key",
    Theme: "Theme",
    TightBorder: "Tight Border",
    SendPreviewBubble: {
      Title: "Send Preview Bubble",
      SubTitle: "Preview markdown in bubble",
    },
    AutoGenerateTitle: {
      Title: "Auto Generate Title",
      SubTitle: "Generate a suitable title based on the conversation content",
    },
    Sync: {
      CloudState: "Last Update",
      NotSyncYet: "Not sync yet",
      Success: "Sync Success",
      Fail: "Sync Fail",

      Config: {
        Modal: {
          Title: "Config Sync",
          Check: "Check Connection",
        },
        SyncType: {
          Title: "Sync Type",
          SubTitle: "Choose your favorite sync service",
        },
        Proxy: {
          Title: "Enable CORS Proxy",
          SubTitle: "Enable a proxy to avoid cross-origin restrictions",
        },
        ProxyUrl: {
          Title: "Proxy Endpoint",
          SubTitle:
            "Only applicable to the built-in CORS proxy for this project",
        },

        WebDav: {
          Endpoint: "WebDAV Endpoint",
          UserName: "User Name",
          Password: "Password",
        },

        UpStash: {
          Endpoint: "UpStash Redis REST Url",
          UserName: "Backup Name",
          Password: "UpStash Redis REST Token",
        },
      },

      LocalState: "Local Data",
      Overview: (overview: any) => {
        return `${overview.chat} chats，${overview.message} messages，${overview.prompt} prompts，${overview.mask} masks`;
      },
      ImportFailed: "Failed to import from file",
    },
    Mask: {
      Splash: {
        Title: "Mask Splash Screen",
        SubTitle: "Show a mask splash screen before starting new chat",
      },
      Builtin: {
        Title: "Hide Builtin Masks",
        SubTitle: "Hide builtin masks in mask list",
      },
    },
    Prompt: {
      Disable: {
        Title: "Disable auto-completion",
        SubTitle: "Input / to trigger auto-completion",
      },
      List: "Prompt List",
      ListCount: (builtin: number, custom: number) =>
        `${builtin} built-in, ${custom} user-defined`,
      Edit: "Edit",
      Modal: {
        Title: "Prompt List",
        Add: "Add One",
        Search: "Search Prompts",
      },
      EditModal: {
        Title: "Edit Prompt",
      },
    },
    HistoryCount: {
      Title: "Attached Messages Count",
      SubTitle: "Number of sent messages attached per request",
    },
    CompressThreshold: {
      Title: "History Compression Threshold",
      SubTitle:
        "Will compress if uncompressed messages length exceeds the value",
    },

    Usage: {
      Title: "Account Balance",
      SubTitle(used: any, total: any) {
        return `Used this month $${used}, subscription $${total}`;
      },
      IsChecking: "Checking...",
      Check: "Check",
      NoAccess: "Enter API Key to check balance",
    },
    Access: {
      AccessCode: {
        Title: "Access Code",
        SubTitle: "Access control Enabled",
        Placeholder: "Enter Code",
      },
      CustomEndpoint: {
        Title: "Custom Endpoint",
        SubTitle: "Use custom Azure or OpenAI service",
      },
      Provider: {
        Title: "Model Provider",
        SubTitle: "Select Azure or OpenAI",
      },
      OpenAI: {
        ApiKey: {
          Title: "OpenAI API Key",
          SubTitle: "User custom OpenAI Api Key",
          Placeholder: "sk-xxx",
        },

        Endpoint: {
          Title: "OpenAI Endpoint",
          SubTitle: "Must starts with http(s):// or use /api/openai as default",
        },
      },
      Azure: {
        ApiKey: {
          Title: "Azure Api Key",
          SubTitle: "Check your api key from Azure console",
          Placeholder: "Azure Api Key",
        },

        Endpoint: {
          Title: "Azure Endpoint",
          SubTitle: "Example: ",
        },

        ApiVerion: {
          Title: "Azure Api Version",
          SubTitle: "Check your api version from azure console",
        },
      },
      CustomModel: {
        Title: "Custom Models",
        SubTitle: "Custom model options, seperated by comma",
      },
    },

    Model: "Model",
    Temperature: {
      Title: "Temperature",
      SubTitle: "A larger value makes the more random output",
    },
    TopP: {
      Title: "Top P",
      SubTitle: "Do not alter this value together with temperature",
    },
    MaxTokens: {
      Title: "Max Tokens",
      SubTitle: "Maximum length of input tokens and generated tokens",
    },
    PresencePenalty: {
      Title: "Presence Penalty",
      SubTitle:
        "A larger value increases the likelihood to talk about new topics",
    },
    FrequencyPenalty: {
      Title: "Frequency Penalty",
      SubTitle:
        "A larger value decreasing the likelihood to repeat the same line",
    },
    Version: {
      Title: "Version",
      SubTitle: "",
    },
  },
  Store: {
    DefaultTopic: "New Chat",
    BotHello: "Hello! How can I assist you today?",
    Error: "Something went wrong, please try again later.",
    Prompt: {
      History: (content: string) =>
        "This is a summary of the chat history as a recap: " + content,
      Topic:
        "Please generate a four to five word title summarizing our conversation without any lead-in, punctuation, quotation marks, periods, symbols, or additional text. Remove enclosing quotation marks.",
      Summarize:
        "Summarize the discussion briefly in 200 words or less to use as a prompt for future context.",
    },
  },
  Copy: {
    Success: "Copied to clipboard",
    Failed: "Copy failed, please grant permission to access clipboard",
  },
  Download: {
    Success: "Content downloaded to your directory.",
    Failed: "Download failed.",
  },
  Context: {
    Toast: (x: any) => `With ${x} contextual prompts`,
    Edit: "Current Chat Settings",
    Add: "Add a Prompt",
    Clear: "Context Cleared",
    Revert: "Revert",
  },
  Shop: {
    Name: "Plans",
  },
  User: {
    Name: "Profile",
  },
  Sync: {
    Name: "Sync",
  },
  Plugin: {
    Name: "Plugin Management",
    Enabled: "Enabled",
    Disabled: "Disabled",
  },
  FineTuned: {
    Sysmessage: "You are an assistant that",
  },
  Mask: {
    Name: "Mask",
    Page: {
      Title: "Prompt Template",
      SubTitle: (count: number) => `${count} prompt templates`,
      Search: "Search Templates",
      Create: "Create",
    },
    Item: {
      Info: (count: number) => `${count} prompts`,
      Chat: "Chat",
      View: "View",
      Edit: "Edit",
      Delete: "Delete",
      DeleteConfirm: "Confirm to delete?",
    },
    EditModal: {
      Title: (readonly: boolean) =>
        `Edit Prompt Template ${readonly ? "(readonly)" : ""}`,
      Download: "Download",
      Clone: "Clone",
    },
    Config: {
      Avatar: "Bot Avatar",
      Name: "Bot Name",
      Description: {
        title: "Bot Description",
        SubTitle: "",
      },
      Sync: {
        Title: "Use Global Config",
        SubTitle: "Use global config in this chat",
        Confirm: "Confirm to override custom config with global config?",
      },
      HideContext: {
        Title: "Hide Context Prompts",
        SubTitle: "Do not show in-context prompts in chat",
      },
      Share: {
        Title: "Share This Mask",
        SubTitle: "Generate a link to this mask",
        Action: "Copy Link",
      },
    },
  },
  NewChat: {
    Return: "Return",
    Skip: "Just Start",
    Title: "Pick a Mask",
    SubTitle: "Chat with the Soul behind the Mask",
    More: "Find More",
    NotShow: "Never Show Again",
    ConfirmNoShow: "Confirm to disable？You can enable it in settings later.",
  },

  UI: {
    Confirm: "Confirm",
    Cancel: "Cancel",
    Close: "Close",
    Create: "Create",
    Edit: "Edit",
    Export: "Export",
    Import: "Import",
    Sync: "Sync",
    Config: "Config",
  },
  Exporter: {
    Model: "Model",
    Messages: "Messages",
    Topic: "Topic",
    Time: "Time",
  },

  URLCommand: {
    Code: "Detected access code from url, confirm to apply? ",
    Settings: "Detected settings from url, confirm to apply?",
  },
  Balance: {
    prefix: {
      1: "Total Remaining",
      2: "Daily",
      3: "Hourly",
      4: "Every 3 Hours",
    },
    tokens: "Tokens",
    basicChatPoints: "Basic Chat Points",
    advancedChatPoints: "Advanced Chat Points",
    drawingPoints: "Drawing Points",
    expirationTime: "Expiration Time",
    unlimited: "Unlimited",
    days: "days",
  },
  OrderState: {
    0: "Pending Submission",
    5: "Awaiting Payment",
    6: "Submission Failed",
    10: "Paid",
    12: "Payment Failed",
    20: "Cancelled",
    30: "Deleted",
    paymentTimeout: "Payment Timeout",
  },
  TransactionType: {
    exchange: "Exchange",
    purchase: "Purchase",
  },
  Labels: {
    transactionTime: "Time:",
  },
  Messages: {
    enterRedeemCode: "Please enter the redemption code!",
  },
  Errors: {
    unknownError: "Unknown Error",
    redeemFailed: "Redemption Failed:",
    invalidCode: "Redemption Failed: Invalid Code",
    codeNotEffective: "Redemption Failed: Code Not Effective",
    codeRedeemed: "Redemption Failed: Code Already Redeemed",
    requestFailed: "Request Failed",
  },
  Success: {
    redeemSuccess: "Redemption Successful!",
  },
  Balance_loges: {
    TypeName: {
      1: "Regular Chat",
      2: "Advanced Chat",
      3: "Tokens",
      4: "Drawing",
    },
    SourceName: {
      1: "Chat Consumption",
      2: "Drawing Consumption",
      3: "Admin Operation",
      4: "Registration Gift",
    },
    Unknown: "Unknown",
    ChangeReason: "Change Reason",
    SubscriptionID: "Subscription ID",
    RecordDate: "Only the latest 50 records of the past 30 days are displayed",
  },
  Assistant: {
    Name: "Assistant:",
    CodeInterpreter: "Invoke Code Interpreter:",
    Status: {
      init: "Initializing",
      queued: "Queued",
      in_progress: "Thinking",
      requires_action: "Awaiting tool response",
      cancelling: "Cancelling",
      cancelled: "Cancelled",
      failed: "Thinking failed",
      completed: "Thinking completed",
      expired: "Thinking took too long",
    },
  },
};

export default en;

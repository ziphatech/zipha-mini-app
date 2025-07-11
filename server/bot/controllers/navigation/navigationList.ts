import { Navigation } from "./navigationClass";
import { handleUsdtPay } from "../callback_handlers/menuButtonsCallback/payment/handleUsdtPay";
import { handleNairaPay } from "../callback_handlers/menuButtonsCallback/payment/handleNairaPay";
import { handleBtcPay } from "../callback_handlers/menuButtonsCallback/payment/handleBtcPay";
import { handleEthereumPay } from "../callback_handlers/menuButtonsCallback/payment/handleEthereumPay";
import { handleSkrillPay } from "../callback_handlers/menuButtonsCallback/payment/handleSkrillPay";
import { generateCouponHandler } from "../callback_handlers/settings/generateCouponHandler";
import { handleSettingsChange } from "../callback_handlers/settings/handleSettingsChange";
import { Context } from "grammy";
import Coupon from "../../models/couponClass";
import { getSubscriptionStatus } from "../callback_handlers/channelHandlers/handleSubscription/checkSubscriptionStatus";
import { handleFAQText } from "../callback_handlers/menuButtonsCallback/payment/handleFAQText";
import { handleBankTransfer } from "../callback_handlers/menuButtonsCallback/payment/handleBankTransfer";


const navigation = Navigation.getInstance();
const couponInstance = Coupon.getInstance();

interface NavigationMapEntry {
  navigation: string | ((ctx: Context) => void | Promise<void> |string);
  callback: ((ctx: Context, ...args: any[]) => Promise<void>) | null;
}

export const navigationMap = (
  ctx: Context,
  messageId: number,
  userId: number,
  data: any
): { [key: string]: NavigationMapEntry } => {
  const { oneMonth, threeMonths, sixMonths, oneYear } = data?.vipDiscountPrice;

  return {
    "vip_signal": {
      navigation: "Vip Signal",
      callback: null,
    },
    "mentorship": {
      navigation: "Mentorship",
      callback: null,
    },
    "partnership": {
      navigation: "Partnership",
      callback: null,
    },
    "fund_management": {
      navigation: "Fund Management",
      callback: null,
    },
    "broker": {
      navigation: "Broker",
      callback: null,
    },
    "prop_firm": {
      navigation: "Prop Firm",
      callback: null,
    },
    "bootcamp": {
      navigation: "3 Days BootCamp",
      callback: null,
    },
    "bootcamp_payment": {
      navigation: "Pay Fee: $79.99",
      callback: null,
    },
    "$10,000 - $49,000": {
      navigation: "$10,000 - $49,000",
      callback: null,
    },
    "$50,000 - $1 million": {
      navigation: "$50,000 - $1 million",
      callback: null,
    },
    "mentorship_price_list": {
      navigation: "Group Mentorship Fee - $300",
      callback: null,
    },
    "one_on_one_price_list": {
      navigation: "1 - On - 1     Fee - $1100",
      callback: null,
    },
    "vip_report": {
      navigation: "VIP Report",
      callback: null,
    },
    "one_month": {
      navigation: `1 Month - $${oneMonth}`,
      callback: null,
    },
    "three_months": {
      navigation: `3 Months - $${threeMonths}`,
      callback: null,
    },
    "six_months": {
      navigation: `6 Months - $${sixMonths}`,
      callback: null,
    },
    "twelve_months": {
      navigation: `12 Months - $${oneYear}`,
      callback: null,
    },
    "agree_one": {
      navigation: "Agree One $1000",
      callback: null,
    },
    "agree_two": {
      navigation: "Agree Two",
      callback: null,
    },
    "usdt": {
      navigation: "USDT",
      callback: handleUsdtPay,
    },
    "naira": {
      navigation: "Naira Payment",
      callback: handleNairaPay,
    },
    "btc": {
      navigation: "BTC",
      callback: handleBtcPay,
    },
    "erc": {
      navigation: "Ethereum Payment",
      callback: handleEthereumPay,
    },
    "skrill": {
      navigation: "Skrill Payment",
      callback: handleSkrillPay,
    },
    "check_subscription_status": {
      navigation: "Check Subscription Status",
      callback: getSubscriptionStatus,
    },
    "gift_coupon": {
      navigation: "Gift Coupon",
      callback: null,
    },
    "generate_coupon": {
      navigation: "Generate Coupon",
      callback: generateCouponHandler,
    },
    "faq": {
      navigation: (ctx: Context): string => {
        navigation.setFAQIndex(userId, 0);
        return "FAQ";
      },
      callback: handleFAQText,
    },
    "next_faq": {
      navigation: (ctx: Context): string => {
        const currentIndex = navigation.getFAQIndex(userId);
        return `next_${currentIndex}`;
      },
      callback: handleFAQText,
    },
    "prev_faq": {
      navigation: (ctx: Context): string => {
        const currentIndex = navigation.getFAQIndex(userId);
        return `prev_${currentIndex}`;
      },
      callback: handleFAQText,
    },
    "foreign_payment": {
      navigation: "Foreign Payment",
      callback: handleBankTransfer,
    },
    "settings": {
      navigation: "Settings",
      callback: null,
    },
    "nairaPrice": {
      navigation: "nairaprice",
      callback: handleSettingsChange,
    },
    "vipDiscountPrice": {
      navigation: "Vip Discount Price",
      callback: handleSettingsChange,
    },
    "vipPrice": {
      navigation: "Vip Prices",
      callback: handleSettingsChange,
    },
    "generate_code": {
      navigation: "Generate Code",
      callback: couponInstance.generateCoupon.bind(couponInstance),
    },
    "goback": {
      navigation: navigation.goBack.bind(navigation),
      callback: null,
    },
    "mainmenu": {
      navigation: navigation.goToMainMenu.bind(navigation),
      callback: null,
    },
  };
};
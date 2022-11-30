import {
  GetServiceResponse,
  PaymentOptions,
  PricingPlan,
} from '@model/service/types';
import { OfferedAsType } from '@model/service/service-types.internal';

export function determinePaymentOptionsBy(
  pricingPlans: PricingPlan[],
  paymentOptions: PaymentOptions
) {
  return [
    ...insertIf(
      !!(pricingPlans?.length && paymentOptions.wixPaidPlan),
      OfferedAsType.PRICING_PLAN
    ),
    ...insertIf(
      isPayable(!!paymentOptions.wixPayInPerson, !!paymentOptions.wixPayOnline),
      OfferedAsType.ONE_TIME
    ),
  ];
}

export function mapServiceOfferedAsDto(serviceResponse: GetServiceResponse) {
  const paymentOptions = serviceResponse!.service!.paymentOptions;
  return determinePaymentOptionsBy(
    serviceResponse!.pricingPlans!,
    paymentOptions!
  );
}

function insertIf(condition: boolean, ...elements: any) {
  return condition ? elements : [];
}

function isPayable(paidOffline: boolean, paidOnline: boolean) {
  return paidOffline || paidOnline;
}

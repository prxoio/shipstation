import { IOrder } from '@/interfaces/IOrder';
import mongoose, { Schema } from 'mongoose';

const MoneySetSchema = new Schema({
    shop_money: {
        amount: String,
        currency_code: String
    },
    presentment_money: {
        amount: String,
        currency_code: String
    }
});

const ClientDetailsSchema = new Schema({
    accept_language: String,
    browser_height: Number,
    browser_ip: String,
    browser_width: Number,
    session_hash: String,
    user_agent: String
});

const AddressSchema = new Schema({
    first_name: String,
    address1: String,
    phone: String,
    city: String,
    zip: String,
    province: String,
    country: String,
    last_name: String,
    address2: String,
    company: String,
    latitude: Number,
    longitude: Number,
    name: String,
    country_code: String,
    province_code: String
});

const emailMarketingConsentSchema = new Schema({
    state: {
      type: String,
      enum: ['subscribed', 'not_subscribed'], // Assuming these are your only two states
      required: true,
    },
    opt_in_level: {
      type: String,
      enum: ['single_opt_in', 'double_opt_in'], // Add any other levels you may have
      required: true,
    },
    consent_updated_at: {
      type: Date, // Or String, depending on how you store dates
      default: null,
    },
  });
const CustomerSchema = new Schema({
    id: Number,
    email: String,
    created_at: String,
    updated_at: String,
    first_name: String,
    last_name: String,
    state: String,
    note: String,
    verified_email: Boolean,
    multipass_identifier: String,
    tax_exempt: Boolean,
    phone: String,
    email_marketing_consent: emailMarketingConsentSchema,
    sms_marketing_consent: String,
    tags: String,
    currency: String,
    tax_exemptions: [String],
    admin_graphql_api_id: String,
    default_address: AddressSchema
});



const LineItemSchema = new Schema({
    id: Number,
    admin_graphql_api_id: String,
    attributed_staffs: [String],
    current_quantity: Number,
    fulfillable_quantity: Number,
    fulfillment_service: String,
    fulfillment_status: String,
    gift_card: Boolean,
    grams: Number,
    name: String,
    price: String,
    price_set: MoneySetSchema,
    product_exists: Boolean,
    product_id: Number,
    properties: [String],
    quantity: Number,
    requires_shipping: Boolean,
    sku: String,
    taxable: Boolean,
    title: String,
    total_discount: String,
    total_discount_set: MoneySetSchema,
    variant_id: Number,
    variant_inventory_management: String,
    variant_title: String,
    vendor: String,
    tax_lines: [String],
    duties: [String],
    discount_allocations: [String]
});

 const OrderSchema = new Schema({
    id: Number,
    storeName: { type: String, required: true },
    uid: { type: String, required: true },
    clientId: { type: String, required: true },
    admin_graphql_api_id: String,
    app_id: Number,
    browser_ip: String,
    buyer_accepts_marketing: Boolean,
    cancel_reason: String,
    cancelled_at: String,
    cart_token: String,
    checkout_id: Number,
    checkout_token: String,
    client_details: ClientDetailsSchema,
    closed_at: String,
    company: String,
    confirmation_number: String,
    confirmed: Boolean,
    contact_email: String,
    created_at: String,
    currency: String,
    current_subtotal_price: String,
    current_subtotal_price_set: MoneySetSchema,
    current_total_additional_fees_set: String,
    current_total_discounts: String,
    current_total_discounts_set: MoneySetSchema,
    current_total_duties_set: String,
    current_total_price: String,
    current_total_price_set: MoneySetSchema,
    current_total_tax: String,
    current_total_tax_set: MoneySetSchema,
    customer_locale: String,
    device_id: String,
    discount_codes: [String],
    email: String,
    estimated_taxes: Boolean,
    financial_status: String,
    fulfillment_status: String,
    landing_site: String,
    landing_site_ref: String,
    location_id: Number,
    merchant_of_record_app_id: String,
    name: String,
    note: String,
    note_attributes: [String],
    number: Number,
    order_number: Number,
    order_status_url: String,
    original_total_additional_fees_set: String,
    original_total_duties_set: String,
    payment_gateway_names: [String],
    phone: String,
    po_number: String,
    presentment_currency: String,
    processed_at: String,
    reference: String,
    referring_site: String,
    source_identifier: String,
    source_name: String,
    source_url: String,
    subtotal_price: String,
    subtotal_price_set: MoneySetSchema,
    tags: String,
    tax_exempt: Boolean,
    tax_lines: [String],
    taxes_included: Boolean,
    test: Boolean,
    token: String,
    total_discounts: String,
    total_discounts_set: MoneySetSchema,
    total_line_items_price: String,
    total_line_items_price_set: MoneySetSchema,
    total_outstanding: String,
    total_price: String,
    total_price_set: MoneySetSchema,
    total_shipping_price_set: MoneySetSchema,
    total_tax: String,
    total_tax_set: MoneySetSchema,
    total_tip_received: String,
    total_weight: Number,
    updated_at: String,
    user_id: Number,
    billing_address: AddressSchema,
    customer: CustomerSchema,
    discount_applications: [String],
    fulfillments: [String],
    line_items: [LineItemSchema],
    payment_terms: String,
    refunds: [String],
    shipping_address: AddressSchema,
    shipping_lines: [String]
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export { Order };

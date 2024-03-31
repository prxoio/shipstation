interface MoneySet {
    shop_money: {
        amount: string;
        currency_code: string;
    };
    presentment_money: {
        amount: string;
        currency_code: string;
    };
}

interface ClientDetails {
    accept_language: string | null;
    browser_height: number | null;
    browser_ip: string;
    browser_width: number | null;
    session_hash: string | null;
    user_agent: string;
}

interface Address {
    first_name: string;
    address1: string;
    phone: string | null;
    city: string;
    zip: string | null;
    province: string;
    country: string;
    last_name: string;
    address2: string | null;
    company: string | null;
    latitude: number | null;
    longitude: number | null;
    name: string;
    country_code: string;
    province_code: string;
}

interface Customer {
    id: number;
    email: string | null;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    state: string;
    note: string | null;
    verified_email: boolean;
    multipass_identifier: string | null;
    tax_exempt: boolean;
    phone: string | null;
    email_marketing_consent: string | null;
    sms_marketing_consent: string | null;
    tags: string;
    currency: string;
    tax_exemptions: string[];
    admin_graphql_api_id: string;
    default_address: Address;
}

interface LineItem {
    id: number;
    admin_graphql_api_id: string;
    attributed_staffs: string[];
    current_quantity: number;
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: string | null;
    gift_card: boolean;
    grams: number;
    name: string;
    price: string;
    price_set: MoneySet;
    product_exists: boolean;
    product_id: number;
    properties: string[];
    quantity: number;
    requires_shipping: boolean;
    sku: string;
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: MoneySet;
    variant_id: number;
    variant_inventory_management: string;
    variant_title: string;
    vendor: string;
    tax_lines: string[];
    duties: string[];
    discount_allocations: string[];
}

interface IOrder {
    id: number;
    storeName: string;
    admin_graphql_api_id: string;
    app_id: number;
    browser_ip: string;
    buyer_accepts_marketing: boolean;
    cancel_reason: string | null;
    cancelled_at: string | null;
    cart_token: string | null;
    checkout_id: number;
    checkout_token: string;
    client_details: ClientDetails;
    closed_at: string | null;
    company: string | null;
    confirmation_number: string;
    confirmed: boolean;
    contact_email: string | null;
    created_at: string;
    currency: string;
    current_subtotal_price: string;
    current_subtotal_price_set: MoneySet;
    current_total_additional_fees_set: string | null;
    current_total_discounts: string;
    current_total_discounts_set: MoneySet;
    current_total_duties_set: string | null;
    current_total_price: string;
    current_total_price_set: MoneySet;
    current_total_tax: string;
    current_total_tax_set: MoneySet;
    customer_locale: string;
    device_id: string | null;
    discount_codes: string[];
    email: string;
    estimated_taxes: boolean;
    financial_status: string;
    fulfillment_status: string | null;
    landing_site: string | null;
    landing_site_ref: string | null;
    location_id: number | null;
    merchant_of_record_app_id: string | null;
    name: string;
    note: string | null;
    note_attributes: string[];
    number: number;
    order_number: number;
    order_status_url: string;
    original_total_additional_fees_set: string | null;
    original_total_duties_set: string | null;
    payment_gateway_names: string[];
    phone: string | null;
    po_number: string | null;
    presentment_currency: string;
    processed_at: string;
    reference: string;
    referring_site: string | null;
    source_identifier: string;
    source_name: string;
    source_url: string | null;
    subtotal_price: string;
    subtotal_price_set: MoneySet;
    tags: string;
    tax_exempt: boolean;
    tax_lines: string[];
    taxes_included: boolean;
    test: boolean;
    token: string;
    total_discounts: string;
    total_discounts_set: MoneySet;
    total_line_items_price: string;
    total_line_items_price_set: MoneySet;
    total_outstanding: string;
    total_price: string;
    total_price_set: MoneySet;
    total_shipping_price_set: MoneySet;
    total_tax: string;
    total_tax_set: MoneySet;
    total_tip_received: string;
    total_weight: number;
    updated_at: string;
    user_id: number;
    billing_address: Address;
    customer: Customer;
    discount_applications: string[];
    fulfillments: string[];
    line_items: LineItem[];
    payment_terms: string | null;
    refunds: string[];
    shipping_address: Address;
    shipping_lines: string[];
}

export type { IOrder }
import React, { useState, useEffect } from "react";
import { generate } from "@pdfme/generator";
import { Template, BLANK_PDF } from "@pdfme/common";
import generateDataMatrixBarcode from "./OrderDataMatrix";
import PdfGeneratorComponent from "./GeneratePDFPostageLabel";

const PdfGenerator = (jobProp: any) => {
  const [postcode, setPostcode] = useState("");
  const [courierType, setCourierType] = useState("");
  const [shippingUnits, setShippingUnits] = useState("");
  const [address, setAddress] = useState("");
  const [jobId, setJobId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [dispatchDate, setDispatchDate] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [note, setNote] = useState("");
  const [itemName, setItemName] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) {
      const item = jobProp?.items[0];
      setPostcode(item.customer.postcode);
      setAddress(item.customer.address);
      setJobId(jobProp.jobId);
      setOrderId(jobProp.orderId);
      setOrderDate(jobProp.timestamp);
      setItemName(item.name);

      setDispatchDate(new Date().toLocaleDateString());
      setDeliveryDate(new Date().toLocaleDateString());
      setNote(jobProp.note);
      setCourierType("N/A");
      setShippingUnits(jobProp?.items[0]?.shippingUnits);

      setDone(true);
    }
  }, [done, jobProp?.items, jobProp.jobId, jobProp.note, jobProp.orderId, jobProp.timestamp]);

  return (
    <>
      {jobProp && (
        <PdfGeneratorComponent
          postcode={jobProp?.items?.customer.postcode}
          courierType={courierType}
          shippingUnits={shippingUnits}
          address={address}
          jobId={jobId}
          orderId={orderId}
          orderDate={orderDate}
          dispatchDate={dispatchDate}
          deliveryDate={deliveryDate}
          note={note}
          itemName={itemName}
          gs1='12345'
        />
      )}
    </>
  );
};

export default PdfGenerator;

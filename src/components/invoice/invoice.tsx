import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  pdf,
} from "@react-pdf/renderer";
import { toast } from "sonner";

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    currencyDisplay: "symbol",
  }).format(amount);

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://b16iy4ork1.ufs.sh/f/obCZnrjJ7li8yY6DuHFzhA2DXk9WlmtRUTOf8QJuHbLZo6IF",
      fontWeight: "normal",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    gap: 32,
    padding: 40,
    fontFamily: "Roboto",
    fontSize: 11,
    color: "#333",
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  coachingInfo: {
    fontSize: 11,
    color: "#222",
    fontWeight: "bold",
  },
  invoiceInfo: {
    textAlign: "right",
    fontSize: 11,
    color: "#444",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#111",
  },
  studentInfo: {
    marginBottom: 24,
    fontSize: 11,
    color: "#333",
  },
  table: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1pt solid #ccc",
    marginTop: 16,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1pt solid #ccc",
    paddingVertical: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
    color: "#222",
  },
  cell: {
    flex: 1,
    fontSize: 11,
    color: "#333",
  },
  lastRow: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#000",
  },
  paymentInfo: {
    marginTop: 28,
    fontSize: 11,
    color: "#444",
  },
});

type SubjectItem = {
  subject: string;
  month: string;
  pricing: number;
};

type Props = {
  logoUrl?: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  studentName: string;
  studentEmail: string;
  subjects: SubjectItem[];
};

export const InvoicePDF: React.FC<Props> = ({
  logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB1sdCfLYKdY4OUCRIHvqReYxEkEQIOsvttQ",
  invoiceNumber,
  invoiceDate,
  dueDate,
  studentName,
  studentEmail,
  subjects,
}) => {
  const total = subjects.reduce((sum, s) => sum + s.pricing, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Invoice</Text>

        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image src={logoUrl} style={styles.logo} />
            <View style={styles.coachingInfo}>
              <Text>Your Coaching Name</Text>
              <Text>Street, City, Zip</Text>
              <Text>Phone / Email</Text>
            </View>
          </View>

          <View style={styles.invoiceInfo}>
            <Text>Invoice No: {invoiceNumber}</Text>
            <Text>Date: {invoiceDate}</Text>
            <Text>Due Date: {dueDate}</Text>
          </View>
        </View>

        <View style={styles.studentInfo}>
          <Text>Student: {studentName}</Text>
          <Text>Contact: {studentEmail}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.headerCell}>Subject</Text>
            <Text style={styles.headerCell}>Month</Text>
            <Text style={styles.headerCell}>Pricing</Text>
          </View>

          {subjects.map((s, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.cell}>{s.subject}</Text>
              <Text style={styles.cell}>{s.month}</Text>
              <Text style={styles.cell}>{formatINR(s.pricing)}</Text>
            </View>
          ))}

          <View style={[styles.tableRow, styles.lastRow]}>
            <Text style={styles.cell}>Total</Text>
            <Text style={styles.cell}></Text>
            <Text style={styles.cell}>{formatINR(total)}</Text>
          </View>
        </View>

        <View style={styles.paymentInfo}>
          <Text>Status: Paid</Text>
          <Text>Payment Method: Cash</Text>
        </View>
      </Page>
    </Document>
  );
};

export const downloadPdf = async (props: Props) => {
  console.log(props)
  const blob = await pdf(<InvoicePDF {...props} />).toBlob();

  const url = URL.createObjectURL(blob);
  if (window === undefined) throw new Error("Cant be used server side");
  const link = document.createElement("a");

  link.href = url;
  link.download = `uc-invoice-${props.invoiceNumber}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
  toast(`Invoice for inv: ${props.invoiceNumber} successfully saved`);
};

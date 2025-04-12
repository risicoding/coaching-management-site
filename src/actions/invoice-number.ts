"use server";
import {
  getInvoiceNumber as _getInvoiceNumber,
  setInvoiceNumber as _setInvoiceNumber,
} from "@/lib/redis/invoice-number";

export const getInvoiceNumber = async () => _getInvoiceNumber();

export const setInvoiceNumber = async (no?: number) => _setInvoiceNumber(no);

import { useState, useEffect } from 'react';
import { Plus, Download, Eye } from 'lucide-react';
import { invoiceAPI } from '../../utils/api';

interface InvoiceManagerProps {
  onUpdate: () => void;
}

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  lineItems: LineItem[];
  subtotal: number;
  vat: number;
  nhil: number;
  getfund: number;
  total: number;
  createdAt: string;
}

export function InvoiceManager({ onUpdate }: InvoiceManagerProps) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
  });
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: '', quantity: 1, rate: 0 }
  ]);
  const [loading, setLoading] = useState(false);

  // Ghanaian tax rates
  const VAT_RATE = 0.125; // 12.5%
  const NHIL_RATE = 0.025; // 2.5%
  const GETFUND_RATE = 0.025; // 2.5%

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await invoiceAPI.getAll();
      setInvoices(data.invoices || []);
    } catch (error) {
      console.error('Error loading invoices:', error);
    }
  };

  const calculateTotals = () => {
    const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
    const vat = subtotal * VAT_RATE;
    const nhil = subtotal * NHIL_RATE;
    const getfund = subtotal * GETFUND_RATE;
    const total = subtotal + vat + nhil + getfund;

    return { subtotal, vat, nhil, getfund, total };
  };

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', quantity: 1, rate: 0 }]);
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: any) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const removeLineItem = (index: number) => {
    setLineItems(lineItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const totals = calculateTotals();
      await invoiceAPI.create({
        ...formData,
        lineItems,
        ...totals,
      });

      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientAddress: '',
      });
      setLineItems([{ description: '', quantity: 1, rate: 0 }]);
      setShowForm(false);
      await loadInvoices();
      onUpdate();
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  const printInvoice = (invoice: Invoice) => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoice.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
            .company { font-size: 24px; font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background: #f5f5f5; }
            .total-row { font-weight: bold; font-size: 18px; }
            .text-right { text-align: right; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="company">SKYDESIGNERS Limited</div>
              <p>Accra, Ghana<br>+233 502 140 791<br>info@skydesigners.com</p>
            </div>
            <div>
              <h2>INVOICE</h2>
              <p><strong>${invoice.invoiceNumber}</strong><br>${new Date(invoice.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div style="margin-bottom: 40px;">
            <h3>Bill To:</h3>
            <p>${invoice.clientName}<br>${invoice.clientEmail}<br>${invoice.clientPhone}<br>${invoice.clientAddress}</p>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Rate (GHS)</th>
                <th class="text-right">Amount (GHS)</th>
              </tr>
            </thead>
            <tbody>
              ${invoice.lineItems.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>₵${item.rate.toFixed(2)}</td>
                  <td class="text-right">₵${(item.quantity * item.rate).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div style="text-align: right; margin-top: 20px;">
            <table style="margin-left: auto; width: 300px;">
              <tr>
                <td>Subtotal:</td>
                <td class="text-right">₵${invoice.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td>VAT (12.5%):</td>
                <td class="text-right">₵${invoice.vat.toFixed(2)}</td>
              </tr>
              <tr>
                <td>NHIL (2.5%):</td>
                <td class="text-right">₵${invoice.nhil.toFixed(2)}</td>
              </tr>
              <tr>
                <td>GETFund (2.5%):</td>
                <td class="text-right">₵${invoice.getfund.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                <td>Total:</td>
                <td class="text-right">₵${invoice.total.toFixed(2)}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="text-align: center; color: #666;">Thank you for your business!</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Invoice Manager</h1>
          <p className="text-gray-600">Create and manage invoices with automatic GHS tax calculations</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          New Invoice
        </button>
      </div>

      {/* Invoice Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-8">
          <h2 className="text-2xl mb-6">Create New Invoice</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="text-lg mb-4">Client Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Client Name *</label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Phone (Ghana format: +233 XXX XXX XXX)</label>
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="+233 502 140 791"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.clientAddress}
                    onChange={(e) => setFormData({ ...formData, clientAddress: e.target.value })}
                    placeholder="Accra, Ghana"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <h3 className="text-lg mb-4">Invoice Items</h3>
              <div className="space-y-4">
                {lineItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4">
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                        placeholder="Description"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateLineItem(index, 'quantity', parseFloat(e.target.value))}
                        placeholder="Qty"
                        min="1"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                      />
                    </div>
                    <div className="col-span-3">
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => updateLineItem(index, 'rate', parseFloat(e.target.value))}
                        placeholder="Rate (GHS)"
                        step="0.01"
                        min="0"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                        required
                      />
                    </div>
                    <div className="col-span-2 flex items-center justify-between">
                      <span className="font-medium">₵{(item.quantity * item.rate).toFixed(2)}</span>
                      {lineItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLineItem(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addLineItem}
                className="mt-4 text-green-600 hover:text-green-700"
              >
                + Add Line Item
              </button>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="max-w-md ml-auto space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₵{totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>VAT (12.5%):</span>
                  <span>₵{totals.vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>NHIL (2.5%):</span>
                  <span>₵{totals.nhil.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>GETFund (2.5%):</span>
                  <span>₵{totals.getfund.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>₵{totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Generate Invoice'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Invoices List */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-2xl mb-6">Invoice History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Invoice #</th>
                <th className="text-left py-3">Client</th>
                <th className="text-left py-3">Date</th>
                <th className="text-right py-3">Total (GHS)</th>
                <th className="text-right py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 font-medium">{invoice.invoiceNumber}</td>
                  <td className="py-4">{invoice.clientName}</td>
                  <td className="py-4">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 text-right">₵{invoice.total.toFixed(2)}</td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => printInvoice(invoice)}
                      className="text-blue-600 hover:text-blue-700 mr-4"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

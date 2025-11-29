"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";

type PaymentMethod = {
  id: string;
  type: string;
  last4: string;
  brand: string;
  expiry: string;
  isDefault: boolean;
};

export default function ClientSettingsPayment() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "카드",
      last4: "1234",
      brand: "Visa",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: "2",
      type: "카드",
      last4: "5678",
      brand: "Mastercard",
      expiry: "06/26",
      isDefault: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  });

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    
    const firstDigit = formData.cardNumber.charAt(0);
    let brand = "카드";
    if (firstDigit === "4") brand = "Visa";
    else if (firstDigit === "5") brand = "Mastercard";
    else if (firstDigit === "3") brand = "American Express";

    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: "카드",
      last4: formData.cardNumber.slice(-4),
      brand,
      expiry: `${formData.expiryMonth}/${formData.expiryYear.slice(-2)}`,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setFormData({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: "",
    });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("이 결제 수단을 삭제하시겠습니까?")) {
      const methodToDelete = paymentMethods.find((m) => m.id === id);
      const newMethods = paymentMethods.filter((m) => m.id !== id);
      
      if (methodToDelete?.isDefault && newMethods.length > 0) {
        newMethods[0].isDefault = true;
      }
      
      setPaymentMethods(newMethods);
    }
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF]">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/client/settings"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#475569] transition-colors hover:text-[#2E5E99]"
        >
          <ArrowLeft className="size-4" />
          <span>설정으로 돌아가기</span>
        </Link>

        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#0F172A]">결제 수단</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-xl bg-[#2E5E99] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1d4673]"
            >
              <Plus className="size-4" />
              <span>새 결제 수단 추가</span>
            </button>
          </div>

          <div className="space-y-3">
            {paymentMethods.length === 0 ? (
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 text-center">
                <p className="text-[#64748B]">등록된 결제 수단이 없습니다.</p>
              </div>
            ) : (
              paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#E9EEF8] text-[#2E5E99]">
                      <span className="text-lg font-bold">{method.brand.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#0F172A]">
                          {method.brand} •••• {method.last4}
                        </span>
                        {method.isDefault ? (
                          <span className="rounded-full bg-[#2E5E99]/10 px-2 py-0.5 text-xs font-medium text-[#2E5E99]">
                            기본
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className="rounded-full bg-[#E2E8F0] px-2 py-0.5 text-xs font-medium text-[#64748B] transition-colors hover:bg-[#CBD5E1]"
                          >
                            기본으로 설정
                          </button>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-[#64748B]">만료일: {method.expiry}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(method.id)}
                    className="rounded-lg p-2 text-[#EF4444] transition-colors hover:bg-red-50"
                    aria-label="결제 수단 삭제"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Add Payment Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">새 결제 수단 추가</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddPaymentMethod} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                  카드 번호
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                    setFormData({ ...formData, cardNumber: value });
                  }}
                  placeholder="1234 5678 9012 3456"
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
                  required
                  maxLength={16}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                    만료 월
                  </label>
                  <input
                    type="text"
                    value={formData.expiryMonth}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 2);
                      setFormData({ ...formData, expiryMonth: value });
                    }}
                    placeholder="MM"
                    className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
                    required
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                    만료 연도
                  </label>
                  <input
                    type="text"
                    value={formData.expiryYear}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setFormData({ ...formData, expiryYear: value });
                    }}
                    placeholder="YYYY"
                    className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
                    required
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0F172A]">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setFormData({ ...formData, cvv: value });
                    }}
                    placeholder="123"
                    className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
                    required
                    maxLength={4}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0F172A]">
                    카드 소유자명
                  </label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
                    placeholder="홍길동"
                    className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-semibold text-[#475569] transition-colors hover:bg-[#F8FAFC]"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#2E5E99] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1d4673]"
                >
                  추가하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, X } from "lucide-react";

type BankAccount = {
  id: string;
  bank: string;
  accountNumber: string;
  accountHolder: string;
  isDefault: boolean;
};

const banks = [
  "KB국민은행",
  "신한은행",
  "우리은행",
  "하나은행",
  "NH농협은행",
  "IBK기업은행",
  "SC제일은행",
  "카카오뱅크",
  "토스뱅크",
];

export default function ExpertSettingsPayment() {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bank: "KB국민은행",
      accountNumber: "123-456-789012",
      accountHolder: "홍길동",
      isDefault: true,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    bank: "",
    accountNumber: "",
    accountHolder: "",
  });

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();

    const newAccount: BankAccount = {
      id: Date.now().toString(),
      bank: formData.bank,
      accountNumber: formData.accountNumber,
      accountHolder: formData.accountHolder,
      isDefault: accounts.length === 0,
    };

    setAccounts([...accounts, newAccount]);
    setFormData({
      bank: "",
      accountNumber: "",
      accountHolder: "",
    });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("이 계좌를 삭제하시겠습니까?")) {
      const accountToDelete = accounts.find((a) => a.id === id);
      const newAccounts = accounts.filter((a) => a.id !== id);

      if (accountToDelete?.isDefault && newAccounts.length > 0) {
        newAccounts[0].isDefault = true;
      }

      setAccounts(newAccounts);
    }
  };

  const handleSetDefault = (id: string) => {
    setAccounts(
      accounts.map((account) => ({
        ...account,
        isDefault: account.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF2FF]">
      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/expert/settings"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[#475569] transition-colors hover:text-[#2E5E99]"
        >
          <ArrowLeft className="size-4" />
          <span>설정으로 돌아가기</span>
        </Link>

        <section className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#0F172A]">출금 계좌</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 rounded-xl bg-[#2E5E99] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1d4673]"
            >
              <Plus className="size-4" />
              <span>새 계좌 추가</span>
            </button>
          </div>

          <div className="space-y-3">
            {accounts.length === 0 ? (
              <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 text-center">
                <p className="text-[#64748B]">등록된 계좌가 없습니다.</p>
              </div>
            ) : (
              accounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#E9EEF8] text-[#2E5E99]">
                      <span className="text-lg font-bold">은</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#0F172A]">
                          {account.bank} {account.accountNumber}
                        </span>
                        {account.isDefault ? (
                          <span className="rounded-full bg-[#2E5E99]/10 px-2 py-0.5 text-xs font-medium text-[#2E5E99]">
                            기본
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetDefault(account.id)}
                            className="rounded-full bg-[#E2E8F0] px-2 py-0.5 text-xs font-medium text-[#64748B] transition-colors hover:bg-[#CBD5E1]"
                          >
                            기본으로 설정
                          </button>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-[#64748B]">예금주: {account.accountHolder}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="rounded-lg p-2 text-[#EF4444] transition-colors hover:bg-red-50"
                    aria-label="계좌 삭제"
                  >
                    <Trash2 className="size-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0F172A]">새 계좌 추가</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-1 text-[#64748B] transition-colors hover:bg-[#F8FAFC]"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddAccount} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">은행</label>
                <select
                  value={formData.bank}
                  onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
                  required
                >
                  <option value="">은행 선택</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">계좌번호</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, accountNumber: value });
                  }}
                  placeholder="123456789012"
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0F172A]">예금주명</label>
                <input
                  type="text"
                  value={formData.accountHolder}
                  onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                  placeholder="홍길동"
                  className="w-full rounded-lg border border-[#E2E8F0] px-4 py-3 text-sm focus:border-[#2E5E99] focus:outline-none"
                  required
                />
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

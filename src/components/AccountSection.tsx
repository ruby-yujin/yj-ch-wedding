import { useState } from "react";
import { kakaoPayIconSrc } from "../data/ImgSrc";

interface AccountInfo {
  role: string;
  name: string;
  bank: string;
  account: string;
  isIcon: boolean;
  icon?: React.ReactNode;
  iconLink?: string;
}

export function AccountSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const groomAccounts: AccountInfo[] = [
    {
      role: "신랑",
      name: "이창훈",
      bank: "기업은행",
      account: "027-139563-01-011",
      isIcon: true,
      icon: (
        <img src={kakaoPayIconSrc[0].src} alt="카카오페이" className="w-12" />
      ),
      iconLink: "https://link.kakaopay.com/__/aE-yBNh"
    },
    {
      role: "신랑 아버지",
      name: "이병재",
      bank: "농협",
      account: "042-02-4076310",
      isIcon: false
    },
    {
      role: "신랑 어머니",
      name: "황연자",
      bank: "국민은행",
      account: "424-001011-18550",
      isIcon: false
    }
  ];

  const brideAccounts: AccountInfo[] = [
    {
      role: "신부",
      name: "박유진",
      bank: "카카오뱅크",
      account: "3333-05-8854031",
      isIcon: true,
      icon: (
        <img src={kakaoPayIconSrc[0].src} alt="카카오뱅크" className="w-12" />
      ),
      iconLink: "https://link.kakaopay.com/__/1IsKs4J"
    },
    {
      role: "신부 어머니",
      name: "김복자",
      bank: "우리은행",
      account: "1002-635-761253",
      isIcon: false
    }
  ];

  const handleCopy = async (account: string, id: string) => {
    try {
      await navigator.clipboard.writeText(account);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const AccountItem = ({ info, id }: { info: AccountInfo; id: string }) => (
    <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
      <div className="flex-1 text-left">
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          {info.role} {info.name}{" "}
          {info.isIcon && info.iconLink && (
            <button
              type="button"
              onClick={() => {
                window.location.href = info.iconLink!;
              }}
              className="inline-flex"
              aria-label={`${info.name} 카카오페이로 송금`}
            >
              {info.icon}
            </button>
          )}
        </p>
        <p className="flex items-center justify-between">
          {info.bank} {info.account}{" "}
          <button
            onClick={() => handleCopy(info.account, id)}
            className="p-3 pr-0 rounded-lg transition-colors shrink-0"
            aria-label="계좌번호 복사"
          >
            <span className="text-xs text-tertiary border border-tertiary rounded-lg px-2 py-1">
              {copiedId === id ? "복사됨" : "복사"}
            </span>
          </button>
        </p>
      </div>
    </div>
  );

  return (
    <section className="w-full max-w-md mx-auto pt-20 px-8 pb-16">
      <div className="text-center mb-12">
        <div className="w-16 h-px bg-tertiary mx-auto mb-8" />
        <h2 className="text-tertiary">마음 전하실 곳</h2>
        <p className="text-sm text-muted-foreground mt-4">
          참석이 어려우신 분들을 위해
          <br />
          계좌번호를 안내해 드립니다.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-card rounded-lg overflow-hidden">
          <div className="p-4 pb-0">
            <h3 className="text-tertiary">🤵🏻‍♂️신랑측 계좌번호</h3>
          </div>
          <div className="pt-4 space-y-3">
            {groomAccounts.map((account, index) => (
              <AccountItem key={index} info={account} id={`groom-${index}`} />
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg overflow-hidden">
          <div className="p-4 pb-0">
            <h3 className="text-tertiary">👰🏻‍♀️신부측 계좌번호</h3>
          </div>
          <div className=" pt-4 space-y-3">
            {brideAccounts.map((account, index) => (
              <AccountItem key={index} info={account} id={`bride-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

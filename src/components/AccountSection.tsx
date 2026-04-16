import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

interface AccountInfo {
  role: string;
  name: string;
  bank: string;
  account: string;
}

export function AccountSection() {
  const [groomOpen, setGroomOpen] = useState(false);
  const [brideOpen, setBrideOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const groomAccounts: AccountInfo[] = [
    {
      role: "신랑",
      name: "이창훈",
      bank: "신한은행",
      account: "110-123-456789"
    },
    {
      role: "신랑 모",
      name: "황연자",
      bank: "우리은행",
      account: "1002-234-567890"
    }
  ];

  const brideAccounts: AccountInfo[] = [
    {
      role: "신부",
      name: "박유진",
      bank: "카카오뱅크",
      account: "3333-01-2345678"
    },
    {
      role: "신부 모",
      name: "김복자",
      bank: "NH농협",
      account: "352-0123-4567-89"
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
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-1">
          {info.role} {info.name}
        </p>
        <p className="mb-1">{info.bank}</p>
        <p className="text-sm text-foreground/80">{info.account}</p>
      </div>
      <button
        onClick={() => handleCopy(info.account, id)}
        className="p-3 hover:bg-secondary rounded-lg transition-colors flex-shrink-0"
        aria-label="계좌번호 복사"
      >
        {copiedId === id ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Copy className="w-5 h-5 text-primary" />
        )}
      </button>
    </div>
  );

  return (
    <section className="w-full max-w-md mx-auto px-8 py-16">
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
        {/* 신랑측 */}
        <div className="bg-card rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => setGroomOpen(!groomOpen)}
            className="w-full p-6 flex items-center justify-between"
          >
            <h3 className="-text-tertiary">🤵🏻‍♂️신랑측 계좌번호</h3>
            {groomOpen ? (
              <ChevronUp className="w-5 h-5 -text-tertiary" />
            ) : (
              <ChevronDown className="w-5 h-5 -text-tertiary" />
            )}
          </button>

          <div
            className={clsx(
              "overflow-hidden transition-all duration-300",
              groomOpen ? "max-h-[500px]" : "max-h-0"
            )}
          >
            <div className="p-6 pt-0 space-y-3">
              {groomAccounts.map((account, index) => (
                <AccountItem key={index} info={account} id={`groom-${index}`} />
              ))}
            </div>
          </div>
        </div>

        {/* 신부측 */}
        <div className="bg-card rounded-lg overflow-hidden shadow-sm">
          <button
            onClick={() => setBrideOpen(!brideOpen)}
            className="w-full p-6 flex items-center justify-between"
          >
            <h3 className="-text-tertiary">👰🏻‍♀️신부측 계좌번호</h3>
            {brideOpen ? (
              <ChevronUp className="w-5 h-5 -text-tertiary" />
            ) : (
              <ChevronDown className="w-5 h-5 -text-tertiary" />
            )}
          </button>

          <div
            className={clsx(
              "overflow-hidden transition-all duration-300",
              brideOpen ? "max-h-[500px]" : "max-h-0"
            )}
          >
            <div className="p-6 pt-0 space-y-3">
              {brideAccounts.map((account, index) => (
                <AccountItem key={index} info={account} id={`bride-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// src/pages/Terms.jsx

const lastUpdated = 'July 1, 2026';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content:
      'By accessing or using the Zero Wear DZ website and placing an order, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.',
  },
  {
    id: 'orders',
    title: 'Orders & Acceptance',
    content:
      'All orders placed through our website are subject to acceptance and availability. We reserve the right to refuse or cancel any order at our discretion, including in cases of suspected fraudulent activity or stock unavailability.',
  },
  {
    id: 'pricing',
    title: 'Pricing & Currency',
    content:
      'All prices displayed on our website are listed in Algerian Dinar (DZD) and are subject to change without prior notice. Prices displayed at the time of order confirmation are the prices that apply to your purchase.',
  },
  {
    id: 'payment',
    title: 'Payment',
    content:
      'We currently accept cash on delivery as our primary payment method. Full payment is due upon delivery of your order. Additional payment methods may be introduced in the future.',
  },
  {
    id: 'delivery',
    title: 'Delivery',
    content:
      'Estimated delivery times are provided for guidance only and are not guaranteed. Zero Wear DZ is not liable for delays caused by circumstances beyond our reasonable control, including courier delays or incorrect address information provided at checkout.',
  },
  {
    id: 'returns',
    title: 'Returns & Exchanges',
    content:
      'Items may be exchanged within 14 days of delivery, provided they are unworn, unwashed, and in their original packaging. Please refer to our FAQ page or contact our support team to initiate an exchange.',
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    content:
      'Zero Wear DZ shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or products, to the fullest extent permitted by law.',
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    content:
      'We reserve the right to update or modify these Terms of Service at any time. Continued use of our website following any changes constitutes acceptance of the revised terms.',
  },
];

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-4 flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
          Terms of Service
        </h1>
        <p className="text-sm text-[#374151]/70">
          Last updated: {lastUpdated}
        </p>
      </div>

      <p className="mb-10 text-sm leading-relaxed text-[#374151] sm:text-base">
        Please read these Terms of Service carefully before using the Zero
        Wear DZ website or placing an order.
      </p>

      {/* Table of contents */}
      <nav className="mb-12 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#374151]">
          On this page
        </p>
        <ul className="flex flex-col gap-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-sm text-[#2563eb] hover:underline"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sections */}
      <div className="flex flex-col gap-10">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="mb-3 text-xl font-semibold text-[#111827] sm:text-2xl">
              {section.title}
            </h2>
            <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Terms;
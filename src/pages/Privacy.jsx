// src/pages/Privacy.jsx

const lastUpdated = 'July 1, 2026';

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    content:
      'When you place an order or contact us, we collect information such as your full name, phone number, delivery address (wilaya, commune, and street address), and any messages you send through our contact form. We do not collect payment card details, as orders are currently processed via cash on delivery.',
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Your Information',
    content:
      'Your information is used solely to process and deliver your orders, respond to inquiries, and improve our products and services. We do not sell or rent your personal information to third parties.',
  },
  {
    id: 'data-storage',
    title: 'Data Storage & Security',
    content:
      'We take reasonable technical and organizational measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    content:
      'Our website may use cookies and similar technologies to enhance your browsing experience, remember your cart contents, and understand how visitors interact with our site. You can disable cookies through your browser settings, though some features may not function properly as a result.',
  },
  {
    id: 'third-parties',
    title: 'Third-Party Services',
    content:
      'We may share limited order information (such as name, phone number, and address) with delivery partners solely for the purpose of fulfilling your order. These partners are obligated to handle your information responsibly.',
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content:
      'You have the right to request access to, correction of, or deletion of your personal information held by us. To make such a request, please reach out via our Contact page.',
  },
  {
    id: 'policy-changes',
    title: 'Changes to This Policy',
    content:
      'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.',
  },
];

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-4 flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#374151]/70">
          Last updated: {lastUpdated}
        </p>
      </div>

      <p className="mb-10 text-sm leading-relaxed text-[#374151] sm:text-base">
        At Zero Wear DZ, we respect your privacy and are committed to
        protecting your personal information. This policy explains what data
        we collect, how we use it, and the choices you have.
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

export default Privacy;
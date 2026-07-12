// src/pages/Contact.jsx

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Card from '../components/ui/Card.jsx';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'support@zerowear.dz',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+213 555 123 456',
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Algiers, Algeria',
  },
];

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', email: '', subject: '', message: '' },
    mode: 'onBlur',
  });

  const onSubmit = async () => {
    // Simulated submission — no backend service wired yet
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mb-12 flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl">
          Get In Touch
        </h1>
        <p className="text-sm text-[#374151] sm:text-base">
          Questions about an order or our products? We'd love to hear from
          you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
        {/* Contact info */}
        <div className="order-last flex flex-col gap-6 lg:order-first">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/10 text-[#2563eb]">
                  <Icon size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">
                    {info.title}
                  </p>
                  <p className="text-sm text-[#374151]">{info.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact form */}
        <div className="order-first lg:order-last lg:col-span-2">
          <Card padding="lg" hoverEffect={false}>
            {isSubmitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#16a34a]/10">
                  <CheckCircle2 size={26} className="text-[#16a34a]" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#111827]">
                    Message Sent
                  </p>
                  <p className="mt-1 text-sm text-[#374151]">
                    Thanks for reaching out — we'll get back to you shortly.
                  </p>
                </div>
                <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="Name"
                    required
                    placeholder="Your name"
                    error={errors.name?.message}
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name is too short' },
                    })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                      },
                    })}
                  />
                </div>

                <Input
                  label="Subject"
                  required
                  placeholder="How can we help?"
                  error={errors.subject?.message}
                  {...register('subject', {
                    required: 'Subject is required',
                  })}
                />

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-[#111827]"
                  >
                    Message<span className="ml-0.5 text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us more..."
                    aria-invalid={!!errors.message}
                    className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm text-[#111827] placeholder:text-[#374151]/50 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                      errors.message
                        ? 'border-red-400 focus:ring-red-400'
                        : 'border-[#e5e7eb] focus:ring-[#2563eb]'
                    }`}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Please write a bit more detail',
                      },
                    })}
                  />
                  {errors.message && (
                    <p className="text-xs font-medium text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  className="mt-2"
                >
                  Send Message
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Contact;
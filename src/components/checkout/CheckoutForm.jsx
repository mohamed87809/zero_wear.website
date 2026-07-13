// src/components/checkout/CheckoutForm.jsx

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import Input from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import { setCustomerInfo } from '../../redux/features/ordersSlice.js';

const wilayas = [
  'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra',
  'Béchar', 'Blida', 'Bouira', 'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret',
  'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda', 'Skikda',
  'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem',
  "M'Sila", 'Mascara', 'Ouargla', 'Oran', 'El Bayadh', 'Illizi',
  'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt',
  'El Oued', 'Khenchela', 'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla',
  'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane',
];

function CheckoutForm({ onValidSubmit, isSubmittingOrder = false }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      wilaya: '',
      commune: '',
      address: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    dispatch(setCustomerInfo(data));
    await onValidSubmit?.(data);
  };

  const isLoading = isSubmitting || isSubmittingOrder;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <Input
        label="Full Name"
        required
        placeholder="e.g. Mohamed Benali"
        error={errors.fullName?.message}
        {...register('fullName', {
          required: 'Full name is required',
          minLength: {
            value: 3,
            message: 'Full name must be at least 3 characters',
          },
        })}
      />

      <Input
        label="Phone Number"
        type="tel"
        required
        placeholder="e.g. 0555 123 456"
        error={errors.phone?.message}
        {...register('phone', {
          required: 'Phone number is required',
          pattern: {
            value: /^(?:\+213|0)(5|6|7)[0-9]{8}$/,
            message: 'Enter a valid Algerian phone number',
          },
        })}
      />

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="wilaya"
          className="text-sm font-medium text-[#111827]"
        >
          Wilaya<span className="ml-0.5 text-red-500">*</span>
        </label>
        <select
          id="wilaya"
          aria-invalid={!!errors.wilaya}
          className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            errors.wilaya
              ? 'border-red-400 focus:ring-red-400'
              : 'border-[#e5e7eb] focus:ring-[#2563eb]'
          }`}
          {...register('wilaya', { required: 'Please select your wilaya' })}
        >
          <option value="">Select your wilaya</option>
          {wilayas.map((wilaya) => (
            <option key={wilaya} value={wilaya}>
              {wilaya}
            </option>
          ))}
        </select>
        {errors.wilaya && (
          <p className="text-xs font-medium text-red-500">
            {errors.wilaya.message}
          </p>
        )}
      </div>

      <Input
        label="Commune"
        required
        placeholder="e.g. Bab Ezzouar"
        error={errors.commune?.message}
        {...register('commune', {
          required: 'Commune is required',
          minLength: {
            value: 2,
            message: 'Commune must be at least 2 characters',
          },
        })}
      />

      <Input
        label="Address"
        required
        placeholder="Street name, building, apartment number..."
        error={errors.address?.message}
        {...register('address', {
          required: 'Address is required',
          minLength: {
            value: 5,
            message: 'Please enter a more detailed address',
          },
        })}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
        className="mt-2"
      >
        Continue to Confirm Order
      </Button>
    </form>
  );
}

export default CheckoutForm;
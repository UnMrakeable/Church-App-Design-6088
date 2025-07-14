import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import SafeIcon from '../common/SafeIcon';
import { usePayments } from '../../contexts/PaymentContext';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiDollarSign, FiHeart, FiLock, FiCheck, FiX } = FiIcons;

// Initialize Stripe (use your actual publishable key)
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key_here');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const PaymentFormContent = ({ onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { processDonation, isProcessing } = usePayments();
  
  const [formData, setFormData] = useState({
    amount: '',
    donorName: '',
    donorEmail: '',
    message: '',
    isAnonymous: false,
    paymentMethod: 'card'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const predefinedAmounts = [10, 25, 50, 100, 250];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) < 1) {
      newErrors.amount = 'Please enter a valid amount (minimum $1)';
    }
    
    if (!formData.isAnonymous) {
      if (!formData.donorName.trim()) {
        newErrors.donorName = 'Name is required for non-anonymous donations';
      }
      if (!formData.donorEmail.trim()) {
        newErrors.donorEmail = 'Email is required for non-anonymous donations';
      } else if (!/\S+@\S+\.\S+/.test(formData.donorEmail)) {
        newErrors.donorEmail = 'Please enter a valid email address';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (formData.paymentMethod === 'card') {
        const card = elements.getElement(CardElement);
        
        // Create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: card,
          billing_details: {
            name: formData.isAnonymous ? 'Anonymous' : formData.donorName,
            email: formData.isAnonymous ? 'anonymous@example.com' : formData.donorEmail,
          },
        });

        if (error) {
          setErrors({ payment: error.message });
          return;
        }

        // Process the donation
        const donationData = {
          ...formData,
          amount: parseFloat(formData.amount),
          currency: 'USD',
          paymentMethodId: paymentMethod.id
        };

        const result = await processDonation(donationData);
        
        if (result.success) {
          onSuccess(result.donation);
        } else {
          setErrors({ payment: result.error });
        }
      } else {
        // Handle PayPal or other payment methods
        const donationData = {
          ...formData,
          amount: parseFloat(formData.amount),
          currency: 'USD'
        };

        const result = await processDonation(donationData);
        
        if (result.success) {
          onSuccess(result.donation);
        } else {
          setErrors({ payment: result.error });
        }
      }
    } catch (error) {
      setErrors({ payment: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Selection */}
      <div>
        <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-3 font-body">
          Donation Amount (USD) *
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-4">
          {predefinedAmounts.map(amount => (
            <button
              key={amount}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
              className={`p-3 rounded-xl border-2 transition-colors font-body ${
                formData.amount === amount.toString()
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                  : 'border-peace-200 dark:border-peace-600 hover:border-primary-300 dark:hover:border-primary-400'
              }`}
            >
              ${amount}
            </button>
          ))}
        </div>
        <div className="relative">
          <SafeIcon icon={FiDollarSign} className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-peace-500 dark:text-peace-400" />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            min="1"
            step="0.01"
            className="w-full pl-12 pr-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
            placeholder="Enter custom amount..."
          />
        </div>
        {errors.amount && (
          <p className="text-red-600 dark:text-red-400 text-sm mt-1 font-body">{errors.amount}</p>
        )}
      </div>

      {/* Anonymous Donation Toggle */}
      <div className="flex items-center space-x-3 p-4 bg-peace-50 dark:bg-peace-700 rounded-xl">
        <input
          type="checkbox"
          id="isAnonymous"
          name="isAnonymous"
          checked={formData.isAnonymous}
          onChange={handleInputChange}
          className="rounded border-peace-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="isAnonymous" className="text-sm font-medium text-peace-700 dark:text-peace-300 font-body">
          Make this donation anonymous
        </label>
      </div>

      {/* Donor Information */}
      {!formData.isAnonymous && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
              Full Name *
            </label>
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              placeholder="Enter your name..."
            />
            {errors.donorName && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1 font-body">{errors.donorName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
              Email Address *
            </label>
            <input
              type="email"
              name="donorEmail"
              value={formData.donorEmail}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-body"
              placeholder="your@email.com"
            />
            {errors.donorEmail && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1 font-body">{errors.donorEmail}</p>
            )}
          </div>
        </div>
      )}

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
          Message (Optional)
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-4 py-3 bg-peace-100 dark:bg-peace-700 rounded-xl text-peace-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-body"
          placeholder="Share a message of support..."
        />
      </div>

      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-3 font-body">
          Payment Method
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
            className={`p-4 rounded-xl border-2 transition-colors flex items-center space-x-3 ${
              formData.paymentMethod === 'card'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                : 'border-peace-200 dark:border-peace-600 hover:border-primary-300'
            }`}
          >
            <SafeIcon icon={FiCreditCard} className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            <span className="font-medium text-peace-900 dark:text-white font-body">Credit/Debit Card</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'paypal' }))}
            className={`p-4 rounded-xl border-2 transition-colors flex items-center space-x-3 ${
              formData.paymentMethod === 'paypal'
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900'
                : 'border-peace-200 dark:border-peace-600 hover:border-primary-300'
            }`}
          >
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="font-medium text-peace-900 dark:text-white font-body">PayPal</span>
          </button>
        </div>
      </div>

      {/* Card Details */}
      {formData.paymentMethod === 'card' && (
        <div>
          <label className="block text-sm font-medium text-peace-700 dark:text-peace-300 mb-2 font-body">
            Card Details *
          </label>
          <div className="p-4 bg-peace-100 dark:bg-peace-700 rounded-xl">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>
      )}

      {/* Error Display */}
      {errors.payment && (
        <div className="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-xl">
          <p className="text-red-600 dark:text-red-400 text-sm font-body">{errors.payment}</p>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900 rounded-xl">
        <SafeIcon icon={FiLock} className="w-4 h-4 text-green-600 dark:text-green-400" />
        <span className="text-green-700 dark:text-green-300 text-sm font-body">
          Your payment information is secure and encrypted
        </span>
      </div>

      {/* Submit Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 text-peace-600 dark:text-peace-300 hover:bg-peace-100 dark:hover:bg-peace-700 rounded-xl transition-colors font-body flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiX} className="w-5 h-5" />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          disabled={!stripe || isSubmitting || isProcessing}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-body flex items-center justify-center space-x-2"
        >
          {isSubmitting || isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <SafeIcon icon={FiHeart} className="w-5 h-5" />
              <span>Donate ${formData.amount || '0'}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const PaymentForm = ({ onSuccess, onCancel }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent onSuccess={onSuccess} onCancel={onCancel} />
    </Elements>
  );
};

export default PaymentForm;
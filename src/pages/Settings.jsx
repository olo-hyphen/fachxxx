import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useToast } from '../contexts/ToastContext';
import { Save } from 'lucide-react';

export const Settings = () => {
  const { user, login } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nip: '',
    address: '',
    bankAccount: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        nip: user.nip || '',
        address: user.address || '',
        bankAccount: user.bankAccount || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call.
    // Here we update the local user state which mimics a profile update.
    login({ ...user, ...formData });
    addToast('Zapisano ustawienia', 'success');
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-primary">Ustawienia</h1>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Dane firmy / użytkownika</h2>
        <p className="text-secondary text-sm mb-6">
          Te dane będą widoczne na generowanych dokumentach (np. kosztorysach).
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="name"
            label="Nazwa firmy / Imię i Nazwisko"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            id="nip"
            label="NIP"
            value={formData.nip}
            onChange={handleChange}
          />

          <Input
            id="address"
            label="Adres"
            value={formData.address}
            onChange={handleChange}
          />

          <Input
            id="phone"
            label="Telefon"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            id="bankAccount"
            label="Numer konta bankowego"
            value={formData.bankAccount}
            onChange={handleChange}
          />

          <div className="flex justify-end mt-4">
            <Button type="submit">
              <Save size={18} className="mr-2" /> Zapisz zmiany
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

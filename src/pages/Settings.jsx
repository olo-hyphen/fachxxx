import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Save } from 'lucide-react';

export const Settings = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    nip: '',
    phone: '',
    address: '',
    bankAccount: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        companyName: user.companyName || '',
        nip: user.nip || '',
        phone: user.phone || '',
        address: user.address || '',
        bankAccount: user.bankAccount || ''
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
    updateUser(formData);
    addToast("Ustawienia zapisane", "success");
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-primary">Ustawienia firmy</h1>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl">
          <h2 className="text-lg font-semibold mb-2">Dane wystawcy (do kosztorysów)</h2>

          <Input
            id="companyName"
            label="Nazwa firmy"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="np. Usługi Remontowe Jan Kowalski"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="name"
              label="Imię i Nazwisko właściciela"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              id="nip"
              label="NIP"
              value={formData.nip}
              onChange={handleChange}
              placeholder="np. 123-456-78-90"
            />
          </div>

          <Input
            id="address"
            label="Adres"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ulica, numer, kod pocztowy, miasto"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              id="phone"
              label="Telefon"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <Input
            id="bankAccount"
            label="Numer konta bankowego"
            value={formData.bankAccount}
            onChange={handleChange}
            placeholder="Opcjonalnie"
          />

          <div className="flex justify-end mt-4">
            <Button type="submit">
              <Save size={18} className="mr-2" /> Zapisz zmiany
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

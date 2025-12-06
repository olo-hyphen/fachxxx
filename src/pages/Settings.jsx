import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../contexts/ToastContext';
import { Save } from 'lucide-react';

/**
 * Settings component.
 * Allows users to view and update their profile and company details.
 *
 * @returns {JSX.Element} The rendered settings page.
 */
export const Settings = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    nip: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        company: user.company || '',
        nip: user.nip || '',
        address: user.address || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    addToast('Ustawienia zapisane', 'success');
  };

  if (!user) return <div>Ładowanie...</div>;

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Ustawienia</h1>
      </div>

      <Card title="Dane Firmy / Profil Użytkownika">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Input
                id="name"
                label="Imię i Nazwisko"
                value={formData.name}
                onChange={handleChange}
                required
             />
             <Input
                id="company"
                label="Nazwa Firmy"
                value={formData.company}
                onChange={handleChange}
                placeholder="Np. JanBud Sp. z o.o."
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Input
                id="email"
                label="Adres Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
             />
             <Input
                id="phone"
                label="Telefon"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Input
                id="nip"
                label="NIP"
                value={formData.nip}
                onChange={handleChange}
                placeholder="000-000-00-00"
             />
             <Input
                id="address"
                label="Adres"
                value={formData.address}
                onChange={handleChange}
                placeholder="ul. Prosta 1, 00-001 Warszawa"
             />
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit">
                <Save size={18} className="mr-2" /> Zapisz zmiany
            </Button>
          </div>
        </form>
      </Card>

      <div className="text-sm text-secondary text-center mt-4">
        <p>Te dane będą widoczne na generowanych kosztorysach i raportach.</p>
      </div>
    </div>
  );
};

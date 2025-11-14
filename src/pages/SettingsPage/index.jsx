import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/HeaderSection";
import PricingSettingsCard from "@/components/AppSidebar/PricingSettingsCard";
import { Spinner } from "@/components/ui/spinner";
import { getSettings } from "@/service/api/settings";
import toast from "react-hot-toast"; 

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    electricityPrice: 0,
    internetFee: 0,
    waterPrice: 0,
    cleaningFee: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch settings data from API
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await getSettings();
      setSettings(res.data || {});
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <HeaderSection
        title="Settings"
        description="Manage your system preferences and pricing"
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <PricingSettingsCard
          settings={settings}
          setSettings={setSettings} // Pass setSettings directly for handling state change
        />
      )}
    </div>
  );
};

export default SettingsPage;

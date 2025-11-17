import React, { useEffect, useState } from "react";
import HeaderSection from "@/components/HeaderSection";
import PricingSettingsCard from "@/components/PricingSettingsCard";
import { Spinner } from "@/components/ui/spinner";
import { getSettings,updateSettings } from "@/service/api/settings";
import toast from "react-hot-toast"; 

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    electricityPrice: 0,
    internetFee: 0,
    waterPrice: 0,
    cleaningFee: 0,
  });
  // const [electricityPrice, setElectricityPrice] = useState(0);
  // const [waterPrice, setWaterPrice] = useState(0);
  // const [internetFee, setInternetFee] = useState(0);
  // const [cleaningFee, setCleaningFee] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettingsData = async () => {
    try {
      debugger
      console.log("")
      setLoading(true);
      const res = await updateSettings({
        ...settings,
        
      });
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating settings");
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await getSettings();
      console.log("dataSetting",res)
      setSettings(res || {});
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
          setSettings={setSettings}
          // electricityPrice={electricityPrice}
          // setElectricityPrice={setElectricityPrice}
          // waterPrice={waterPrice}
          // setWaterPrice={setWaterPrice}
          // internetFee={internetFee}
          // setInternetFee={setInternetFee}
          // cleaningFee={cleaningFee}
          // setCleaningFee={setCleaningFee}
          updateSettingsData={updateSettingsData}
        />
      )}
    </div>
  );
};

export default SettingsPage;

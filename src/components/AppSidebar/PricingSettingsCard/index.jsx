import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap, Droplets, Wifi, Sparkles } from "lucide-react";

const PricingSettingsCard = ({ settings, setSettings }) => {


  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Configuration</CardTitle>
        <CardDescription>Set the pricing for utilities and services</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium flex items-center gap-2"> 
              <Zap className="w-4 h-4 text-yellow-500" />
              Electricity Price (₫/kWh)
            </label>
            <Input
              type="number"
              name="electricityPrice"              
              placeholder="Enter price"
            />
            <p className="text-muted-foreground text-sm">Price per kilowatt-hour (kWh)</p>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              Water Price (₫/m³)
            </label>
            <Input
              type="number"
              name="waterPrice"              
              placeholder="Enter price"
            />
            <p className="text-muted-foreground text-sm">Price per cubic meter (m³)</p>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Wifi className="w-4 h-4 text-purple-500" />
              Internet Fee (₫/month)
            </label>
            <Input
              type="number"
              name="internetFee"              
              placeholder="Enter price"
            />
            <p className="text-muted-foreground text-sm">Monthly internet fee</p>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-green-500" />
              Cleaning Fee (₫/month) - Optional
            </label>
            <Input
              type="number"
              name="cleaningFee"              
              placeholder="Enter price"
            />
            <p className="text-muted-foreground text-sm">Monthly cleaning fee (optional)</p>
          </div>

          <Button type="submit" className="w-full">
            Save Settings
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PricingSettingsCard;

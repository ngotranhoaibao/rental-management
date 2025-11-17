  import React from "react";
  import { Button } from "../ui/button";
  import { IconPlus } from "@tabler/icons-react";
  import { Input } from "../ui/input";
  import { Card, CardContent, CardHeader } from "../ui/card";

  function HeaderSection({ title, description, handleOpenDiglog, placeholder, add,searchTerm,
  setSearchTerm, }) {
    return (
      <>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title} </h1>
            <p className="text-muted-foreground mt-2">{description}</p>
          </div>
          <div>{
            title!=="Settings" && title!=="Dashboard" &&(<Button onClick={handleOpenDiglog} className="flex items-center">
              <IconPlus />
              {add}
            </Button>)
          }
            
          </div>
        </div>
        {title !== "Bills Management" && title!=="Settings" && title!=="Dashboard" && (
          <Card className="w-full gap-2">
            <CardHeader className="font-semibold leading-none">Search {title}</CardHeader>
            <CardContent>
              <Input placeholder={placeholder} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </CardContent>
          </Card>
        )}
      </>
    );
  }

  export default HeaderSection;

import React from "react";

const Header = () => {
  return (
    <header className="border-b border-border bg-card h-16 flex items-center px-4 lg:px-8">
      <button
        data-slot="button"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg:not([className*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 size-9 lg:hidden mr-2"
      >
      </button>
      <h2 className="text-sm lg:text-lg font-semibold text-foreground truncate">
        Welcome to Rental Management System
      </h2>
    </header>
  );
};

export default Header;

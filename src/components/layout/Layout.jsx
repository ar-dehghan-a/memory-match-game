import { cn } from "@/lib/utils";

function Layout({ children, className }) {
  return (
    <div
      className={cn(
        "mx-auto min-h-dvh w-full max-w-xl flex flex-col px-2 py-4 sm:px-4 sm:py-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

Layout.Header = function Header({ children, className }) {
  return <header className={cn("mb-4 sm:mb-8", className)}>{children}</header>;
};

Layout.Content = function Content({ children, className }) {
  return <main className={cn("flex-1", className)}>{children}</main>;
};

// Layout.Footer = function Footer({children, className}) {
//   return <footer className={cn('mt-4 sm:mt-8', className)}>{children}</footer>
// }

export default Layout;

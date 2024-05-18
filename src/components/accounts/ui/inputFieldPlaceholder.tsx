// components/accounts/ui/inputFieldPlaceholder.jsx
const InputFieldPlaceholder: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 ">
      <div className="bg-foreground opacity-20 h-3 w-24 rounded-md animate-pulse "></div>
      <div className="bg-background h-10 rounded-md relative py-6 mb-2">
        <span className="h-3.5 w-2/3 mr-auto bg-muted-foreground absolute rounded-md top-1/2 -translate-y-1/2 opacity-20 animate-pulse"></span>
      </div>
    </div>
  );
};

export default InputFieldPlaceholder;

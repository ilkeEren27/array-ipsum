"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  generateInts, 
  generateFloats, 
  generateDoubles, 
  generateStrings, 
  generateBools,
  formatOutput,
  generateCodeSnippet 
} from "@/lib/generators";
import { Copy, Check, Sparkles, Code2, Brackets, Hash, CircleDot, Binary, Type, ToggleLeft } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const dataTypes = [
  { value: "int", label: "Integer", icon: Hash, description: "Whole numbers" },
  { value: "float", label: "Float", icon: CircleDot, description: "2 decimal places" },
  { value: "double", label: "Double", icon: Binary, description: "6 decimal places" },
  { value: "string", label: "String", icon: Type, description: "Lorem ipsum words" },
  { value: "bool", label: "Boolean", icon: ToggleLeft, description: "true/false" },
];

const languages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "c", label: "C" },
];

export default function Home() {
  const [selectedType, setSelectedType] = useState("int");
  const [count, setCount] = useState(10);
  const [generatedArray, setGeneratedArray] = useState(null);
  const [copied, setCopied] = useState(false);
  const [codeView, setCodeView] = useState(false);
  const [language, setLanguage] = useState("javascript");

  // Clear output when data type changes
  const handleTypeChange = (newType) => {
    setSelectedType(newType);
    setGeneratedArray(null);
    setCopied(false);
  };

  const handleGenerate = () => {
    let result;
    switch (selectedType) {
      case "int":
        result = generateInts(count);
        break;
      case "float":
        result = generateFloats(count);
        break;
      case "double":
        result = generateDoubles(count);
        break;
      case "string":
        result = generateStrings(count);
        break;
      case "bool":
        result = generateBools(count);
        break;
      default:
        result = generateInts(count);
    }
    setGeneratedArray(result);
    setCopied(false);
  };

  const handleCopy = async () => {
    const textToCopy = codeView 
      ? generateCodeSnippet(generatedArray, selectedType, language)
      : formatOutput(generatedArray, selectedType);
    
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getOutput = () => {
    if (!generatedArray) return null;
    return codeView 
      ? generateCodeSnippet(generatedArray, selectedType, language)
      : formatOutput(generatedArray, selectedType);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex flex-col items-center justify-center p-4 sm:p-8">


      {/* Theme Toggle - absolute positioned */}
      <div className="fixed top-4 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Hero */}
      <div className="text-center mb-8 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brackets className="w-8 h-8 text-primary" />
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Array<span className="text-primary">Ipsum</span>
          </h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Generate placeholder arrays for your code in seconds
        </p>
        <a 
          href="https://marketplace.visualstudio.com/items?itemName=ilkeEren.array-ipsum"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-sm text-primary hover:text-primary/80 hover:underline transition-colors duration-200"
        >
          Also available in VSCode as an extension!
        </a>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-4xl relative z-10 shadow-xl border-border/50 bg-card/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Generator</CardTitle>
              <CardDescription>Select a data type and count</CardDescription>
            </div>
            <Badge variant="secondary" className="font-mono">
              v1.0
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Data Type Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Data Type</label>
            <Tabs value={selectedType} onValueChange={handleTypeChange} className="w-full">
              <TabsList className="w-full grid grid-cols-5 h-auto">
                {dataTypes.map((type) => (
                  <TabsTrigger
                    key={type.value}
                    value={type.value}
                    className="flex flex-col gap-1 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all cursor-pointer"
                  >
                    <type.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[10px] sm:text-xs">{type.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <p className="text-sm font-medium text-foreground/70 text-center mt-3 min-h-[1.5rem]">
              {dataTypes.find(t => t.value === selectedType)?.description}
            </p>
          </div>

          {/* Count Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Number of Elements</label>
            <div className="flex gap-2">
              <Input
                type="number"
                min={1}
                max={1000}
                value={count}
                onChange={(e) => setCount(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                className="flex-1 font-mono"
                placeholder="Enter count (1-1000)"
              />
              <Button 
                onClick={handleGenerate}
                className="gap-2 px-6 cursor-pointer"
                size="lg"
              >
                <Sparkles className="w-4 h-4" />
                Generate
              </Button>
            </div>
          </div>

          {/* Output Section */}
          {generatedArray && (
            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-muted-foreground">Output</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant={codeView ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCodeView(!codeView)}
                    className="gap-1 h-7 text-xs cursor-pointer"
                  >
                    <Code2 className="w-3 h-3" />
                    Code
                  </Button>
                  {codeView && (
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-28 h-7 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.value} value={lang.value} className="text-xs">
                            {lang.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
              <div className="relative group">
                <pre className="bg-muted/50 border rounded-lg p-4 overflow-x-auto font-mono text-sm whitespace-pre-wrap break-all">
                  <code>{getOutput()}</code>
                </pre>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleCopy}
                  className="absolute top-2 right-2 h-8 w-8 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Generated {generatedArray.length} {selectedType} elements
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="w-full py-8 flex items-center justify-center relative z-10">
        <p className="text-center text-muted-foreground">
          Made by{" "}
          <a 
            className="underline text-primary hover:text-primary/80 transition-colors duration-200 font-medium" 
            href="https://ilkeeren.dev"
          >
            Eren
          </a>{" "}
          with <span className="text-primary">❤️</span>
        </p>
      </footer>
    </main>
  );
}

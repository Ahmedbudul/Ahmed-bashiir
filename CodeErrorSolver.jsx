import { useState } from 'react';
import { Button } from './components/ui/botton.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card.jsx';
import { Input } from './components/ui/input.jsx';
import { Label } from './components/ui/Label.jsx';
import { Textarea } from './components/ui/textarea.jsx';
import { Check, X } from 'lucide-react';

const syntaxErrors = {
  python: [
    { pattern: /print([^)]*)/g, message: "Ensure parentheses are used correctly." },
    { pattern: /if\s+[^:]+:/g, message: "Ensure colon is used after condition." },
  ],
  html: [
    { pattern: /<([a-zA-Z]+)[^>]*>[\s\S]*<\/\1>/g, message: "Ensure tags are properly closed." },
    { pattern: /<([a-zA-Z]+)[^>]*\/>/g, message: "Ensure self-closing tags are properly formatted." },
  ],
  css: [
    { pattern: /([a-zA-Z-]+):\s*[^;]+;/g, message: "Ensure properties are properly formatted." },
    { pattern: /@media\s+[^{]+\s*\{[\s\S]*\}/g, message: "Ensure media queries are properly formatted." },
  ],
  javascript: [
    { pattern: /console\.log([^)]*)/g, message: "Ensure parentheses are used correctly." },
    { pattern: /if\s*[^)]+\s*\{[\s\S]*\}/g, message: "Ensure conditionals are properly formatted." },
  ]
};

const CodeErrorSolver = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [suggestions, setSuggestions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const detectErrors = () => {
    const errors = syntaxErrors[language];
    const foundSuggestions = errors.reduce((acc, error) => {
      const matches = code.match(error.pattern);
      if (matches) {
        acc.push(...matches.map(match => `${error.message} (Found: ${match})`));
      }
      return acc;
    }, []);
    setSuggestions(foundSuggestions);
  };

  const submitFeedback = () => {
    if (feedback) {
      console.log('Feedback submitted:', feedback);
      setFeedbackSubmitted(true);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Code Error Solver</CardTitle>
        <CardDescription>Select a language and input your code to detect errors.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Label htmlFor="language" className="block mb-2">Language</Label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="python">Python</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>
        <div className="mb-4">
          <Label htmlFor="code" className="block mb-2">Code</Label>
          <Textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-2 border rounded h-40"
          />
        </div>
        <Button onClick={detectErrors} className="mb-4">Detect Errors</Button>
        {suggestions.length > 0 && (
          <div className="mb-4">
            <CardTitle className="text-lg font-bold">Suggestions</CardTitle>
            <ul className="list-disc pl-6">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-4">
          <Label htmlFor="feedback" className="block mb-2">Feedback</Label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border rounded h-20"
            placeholder="Was the suggestion helpful?"
          />
        </div>
        <Button onClick={submitFeedback} disabled={feedbackSubmitted}>
          {feedbackSubmitted ? 'Feedback Submitted' : 'Submit Feedback'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CodeErrorSolver;
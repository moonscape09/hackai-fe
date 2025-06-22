"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, ArrowRight } from "lucide-react"

type FormState = {
  who: string
  ageMin: string
  ageMax: string
  location: string
  whatTheyDo: string
  tone: string
  emojis: string
  languageStyle: string
  devSlang: string
  struggles: string
  goals: string
  whatMakesThemShare: string
  tryingToAchieve: string
  favoriteContent: string
  themes: string
  avoid: string
  uniqueFit: string
  lovedCreators: string
}

type Field =
  | { key: "who"; label: string; type: "text" }
  | { key: "ageRange"; label: string; type: "number-range" }
  | { key: "location"; label: string; type: "text" }
  | { key: "whatTheyDo"; label: string; type: "textarea" }
  | { key: "tone"; label: string; type: "text" }
  | { key: "emojis"; label: string; type: "select"; options: string[] }
  | { key: "languageStyle"; label: string; type: "text" }
  | { key: "devSlang"; label: string; type: "textarea" }
  | { key: "struggles"; label: string; type: "textarea" }
  | { key: "goals"; label: string; type: "textarea" }
  | { key: "whatMakesThemShare"; label: string; type: "textarea" }
  | { key: "tryingToAchieve"; label: string; type: "textarea" }
  | { key: "favoriteContent"; label: string; type: "textarea" }
  | { key: "themes"; label: string; type: "textarea" }
  | { key: "avoid"; label: string; type: "textarea" }
  | { key: "uniqueFit"; label: string; type: "textarea" }
  | { key: "lovedCreators"; label: string; type: "textarea" }

const FIELDS: Field[] = [
  { key: "who", label: "1. Who are they?", type: "text" },
  { key: "ageRange", label: "2. Age range?", type: "number-range" },
  { key: "location", label: "3. Where are they located?", type: "text" },
  { key: "whatTheyDo", label: "4. What do they do?", type: "textarea" },
  { key: "tone", label: "5. Tone & language they relate to?", type: "text" },
  {
    key: "emojis",
    label: "6. Emoji usage?",
    type: "select",
    options: ["Emoji-heavy 🎉", "Light emoji use 🙂", "No emojis ❌"],
  },
  { key: "languageStyle", label: "7. Language style?", type: "text" },
  { key: "devSlang", label: "8. Dev slang / inside jokes?", type: "textarea" },
  { key: "struggles", label: "9. What do they struggle with?", type: "textarea" },
  { key: "goals", label: "10. Secret goals or dreams?", type: "textarea" },
  { key: "whatMakesThemShare", label: "11. What makes them share or laugh?", type: "textarea" },
  { key: "tryingToAchieve", label: "12. What are they trying to achieve?", type: "textarea" },
  { key: "favoriteContent", label: "13. What content do they enjoy most?", type: "textarea" },
  { key: "themes", label: "14. What themes should you focus on?", type: "textarea" },
  { key: "avoid", label: "15. What to avoid sounding like?", type: "textarea" },
  { key: "uniqueFit", label: "16. What makes your brand unique?", type: "textarea" },
  { key: "lovedCreators", label: "17. Creators or brands they love?", type: "textarea" },
]

// helpful placeholder text for each field
const PLACEHOLDERS: Record<string, string> = {
  who: "Junior devs, bootcamp grads, indie hackers…",
  location: "Global, US, India, Remote…",
  whatTheyDo: "Students, freelancers, full-time devs, side-project hustlers…",
  tone: "Funny & meme-y, Casual & excited, Sarcastic…",
  languageStyle: "Conversational, Gen Z, formal, technical…",
  devSlang: "story points, merge conflict, npm run dev anxiety…",
  struggles: "Imposter syndrome, burnout, debugging horror stories…",
  goals: "Going viral on GitHub, building a SaaS, quitting my job…",
  whatMakesThemShare: "Memes, real rants, inside jokes, “just dev things”…",
  tryingToAchieve: "Get hired, grow skillset, launch a product…",
  favoriteContent: "Dev memes, debugging stories, AI experiments…",
  themes: "Workplace humor, AI in dev life, coding fails…",
  avoid: "Too corporate, boring, overly technical, salesy…",
  uniqueFit: "Built by devs who get the hustle, real, raw, funny…",
  lovedCreators: "Fireship, The Primeagen, r/ProgrammerHumor…",
}

export function AudienceForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>({
    who: "",
    ageMin: "",
    ageMax: "",
    location: "",
    whatTheyDo: "",
    tone: "",
    emojis: "",
    languageStyle: "",
    devSlang: "",
    struggles: "",
    goals: "",
    whatMakesThemShare: "",
    tryingToAchieve: "",
    favoriteContent: "",
    themes: "",
    avoid: "",
    uniqueFit: "",
    lovedCreators: "",
  })

  const field = FIELDS[step]
  const prev = () => step > 0 && setStep((s) => s - 1)
  const next = () => step < FIELDS.length - 1 && setStep((s) => s + 1)
  const update = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = () => {
    console.log("🚀 submitting:", form)
    // …your API call here
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={prev}
          disabled={step === 0}
        >
          <ArrowLeft />
        </Button>

        <CardTitle>
          {step + 1} / {FIELDS.length}
        </CardTitle>

        {step < FIELDS.length - 1 ? (
          <Button variant="ghost" size="icon" onClick={next}>
            <ArrowRight />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </CardHeader>

      <CardContent>
        <p className="mb-3 font-medium">{field.label}</p>

        {/* TEXT */}
        {field.type === "text" && (
          <Input
            placeholder={PLACEHOLDERS[field.key] || ""}
            value={form[field.key as keyof FormState] as string}
            onChange={(e) => update(field.key as keyof FormState, e.target.value)}
            className="focus:ring-0 focus:border-gray-300 focus:outline-none"
          />
        )}

        {/* TEXTAREA */}
        {field.type === "textarea" && (
          <Textarea
            rows={4}
            placeholder={PLACEHOLDERS[field.key] || ""}
            value={form[field.key as keyof FormState] as string}
            onChange={(e) => update(field.key as keyof FormState, e.target.value)}
            className="focus:ring-0 focus:border-gray-300 focus:outline-none"
          />
        )}

        {/* SELECT */}
        {field.type === "select" && (
          <select
            className="w-full border rounded p-2 focus:ring-0 focus:border-gray-300 focus:outline-none"
            value={form[field.key as keyof FormState] as string}
            onChange={(e) => update(field.key as keyof FormState, e.target.value)}
          >
            <option value="" disabled>
              Select…
            </option>
            {(field as any).options.map((opt: string) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        {/* NUMBER-RANGE */}
        {field.type === "number-range" && (
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="18"
              min={0}
              max={150}
              value={form.ageMin}
              onChange={(e) => update("ageMin", e.target.value)}
              className="focus:ring-0 focus:border-gray-300 focus:outline-none flex-1"
            />
            <Input
              type="number"
              placeholder="35"
              min={0}
              max={150}
              value={form.ageMax}
              onChange={(e) => update("ageMax", e.target.value)}
              className="focus:ring-0 focus:border-gray-300 focus:outline-none flex-1"
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
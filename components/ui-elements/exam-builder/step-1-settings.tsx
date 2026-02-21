"use client";

import { UseFormReturn } from "react-hook-form";
import { SettingsData } from "@/types/exam";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step1SettingsProps {
  form: UseFormReturn<SettingsData>;
}

export function Step1Settings({ form }: Step1SettingsProps) {
  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="flex border-b border-muted rounded-md overflow-hidden">
              <TabsTrigger value="basic" className="flex-1">
                Basic Information
              </TabsTrigger>
              <TabsTrigger value="type" className="flex-1">
                Exam Type Settings
              </TabsTrigger>
              <TabsTrigger value="time" className="flex-1">
                Time & Duration
              </TabsTrigger>
            </TabsList>

            {/* ---------------- BASIC TAB ---------------- */}
            <TabsContent value="basic">
              <Card className="mt-4">
                <CardContent className="p-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Chemistry Mid-Term"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instructions</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Read all questions carefully..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="examType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exam Paper Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select paper type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mcq">
                              Multiple Choice (MCQ)
                            </SelectItem>
                            <SelectItem value="descriptive">
                              Descriptive (Written)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This will change the question editor in the next step.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* ---------------- TYPE TAB ---------------- */}
            <TabsContent value="type">
              <Card className="mt-4">
                <CardContent className="p-6 space-y-8">
                  <FormField
                    control={form.control}
                    name="questionView"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Question View</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="all-in-one" />
                              <FormLabel className="font-normal">
                                All in One
                              </FormLabel>
                            </div>

                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="one-by-one" />
                              <FormLabel className="font-normal">
                                One by One
                              </FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <FormLabel>More Options</FormLabel>
                    <div className="space-y-4 mt-2 p-4 border rounded-md">
                      <FormField
                        control={form.control}
                        name="shuffleQuestions"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <FormLabel className="font-normal">
                              Shuffle questions
                            </FormLabel>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(value) =>
                                  field.onChange(!!value)
                                }
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="showResults"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between">
                            <FormLabel className="font-normal">
                              Show results after exam
                            </FormLabel>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(value) =>
                                  field.onChange(!!value)
                                }
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ---------------- TIME TAB ---------------- */}
            <TabsContent value="time">
              <Card className="mt-4">
                <CardContent className="p-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="60"
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </form>
    </Form>
  );
}

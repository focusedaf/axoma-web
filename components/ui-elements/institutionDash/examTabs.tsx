"use client";

import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InstitutionExam } from "@/lib/data";
import { StatusBadge } from "./statusBadge";

interface Props {
  ongoingExams: InstitutionExam[];
  upcomingExams: InstitutionExam[];
  completedExams: InstitutionExam[];
}

export function InstitutionExamsTabs({
  ongoingExams,
  upcomingExams,
  completedExams,
}: Props) {
  return (
    <Tabs defaultValue="ongoing">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      {/* ---------------- Ongoing ---------------- */}
      <TabsContent value="ongoing">
        <Card>
          <CardHeader>
            <CardTitle>Ongoing Exams</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Candidates</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {ongoingExams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>

                    <TableCell>{exam.candidates}</TableCell>

                    <TableCell>{exam.startDate}</TableCell>

                    <TableCell>
                      <StatusBadge status={exam.status} />
                    </TableCell>

                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {ongoingExams.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No ongoing exams found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ---------------- Upcoming ---------------- */}
      <TabsContent value="upcoming">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Candidates</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {upcomingExams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>

                    <TableCell>{exam.candidates}</TableCell>

                    <TableCell>{exam.startDate}</TableCell>

                    <TableCell>
                      <StatusBadge status={exam.status} />
                    </TableCell>

                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {upcomingExams.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No upcoming exams found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* ---------------- Completed ---------------- */}
      <TabsContent value="completed">
        <Card>
          <CardHeader>
            <CardTitle>Completed Exams</CardTitle>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Candidates</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {completedExams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>

                    <TableCell>{exam.candidates}</TableCell>

                    <TableCell>{exam.startDate}</TableCell>

                    <TableCell>
                      <StatusBadge status={exam.status} />
                    </TableCell>

                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {completedExams.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      No completed exams found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

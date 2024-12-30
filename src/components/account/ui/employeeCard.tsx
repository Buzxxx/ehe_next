import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Avataar from "@/components/dashboard/ui/avataar";

import {
  Phone,
  WhatsAppOutline,
  CalendarIcon,
} from "@/components/ui/icons";

import { formatDate } from "@/lib/formatDate";
import { Badge } from "@/components/ui/badge";
import { Employee } from "../feature/employeeColumn";
import React from "react";

type EmployeeCardProps = {
  location: string;
  employee: Employee;
  onResetPassword: () => void;
  onDeactivateUser: () => void;
};

export const EmployeeCard = React.memo(
  ({
    employee,
    onResetPassword,
    onDeactivateUser,
    location,
  }: EmployeeCardProps) => {
    return (
      <Card className="bg-white shadow-sm border border-gray-200 rounded-md hover:shadow-md transition flex-1 flex flex-col">

        {/* Content */}
        <CardContent className="p-4 text-sm flex-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avataar
                className="h-10 w-10 rounded-full border border-gray-300"
              />
              <div>
                <p className="text-gray-800 font-semibold">{employee.name ?? "Unknown Name"}</p>
                <Link
                  href={`/account/${employee.teamId}/${location}/employees/${employee.id}`}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  View Profile
                </Link>
              </div>
            </div>

            <Badge className="text-xs font-medium text-gray-600 bg-gray-100">
              {employee.role ?? "User"}
            </Badge>
          </div>

          <div className="mt-6 flex flex-col gap-1 text-xs items-start">
            <Button
              onClick={onResetPassword}
              variant="ghost"
              className="hover:text-blue-600 text-gray-600 px-1 py-0 h-fit font-normal hover:bg-transparent text-xs"
            >
              Reset Password
            </Button>
            <Button
              onClick={onDeactivateUser}
              variant="ghost"
              className="text-red-400 hover:text-red-600 px-1  py-0 h-fit font-normal hover:bg-transparent text-xs"
            >
              Deactivate User
            </Button>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="py-0 flex items-center justify-between bg-gray-50">
          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="p-0 text-green-600 hover:text-green-700"
            >
              <Link
                href={`https://wa.me/${employee.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppOutline size={18} />
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="p-0 text-blue-600 hover:text-blue-700"
            >
              <Link
                href={`tel:${employee.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone size={18} />
              </Link>
            </Button>
          </div>
          {employee.date_joined && (
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <CalendarIcon size={16} />
              {formatDate(employee.date_joined, { onlyDate: true })}
            </div>
          )}
        </CardFooter>
      </Card>
    );
  }
);

// Add display name for debugging
EmployeeCard.displayName = "EmployeeCard";

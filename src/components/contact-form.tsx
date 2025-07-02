"use client"

import {useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { QRCodeCanvas } from "qrcode.react"

import
{
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField
} from "@/components/ui/form"

import { toast } from "sonner"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object
(
    {
        name: z.string(),
        email: z.string().email("Invalid email address"),
        phone: z.string(),
        message: z.string()
            .min(10, "Message must be at least 10 characters")
            .max(255, "Message cannot be longer than 255 characters"),
    }
);

export default function ContactForm()
{
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

    const form = useForm<z.infer<typeof contactSchema>>
    (
        {
            resolver: zodResolver(contactSchema),
            defaultValues:
            {
                name: "",
                email: "",
                phone: "",
                message: ""
            }
        }
    );

    async function onSubmit(values: z.infer<typeof contactSchema>)
    {
        const endpoint = process.env.NEXT_PUBLIC_CONTACT_API_ENDPOINT

        if (!endpoint)
        {
            throw new Error("No contact endpoint provided")
        }

        setStatus("sending")

        try
        {
            const response = await fetch
            (
                endpoint,
                {
                    method: "POST",
                    body: JSON.stringify(values),
                }
            )

            if (!response.ok)
            {
                setStatus("error")
                throw new Error(`Response status: ${response.status}`);
            }

            setStatus("sent")

            toast.success("Message sent!")
            console.log(response)
        }
        catch (e)
        {
            if (e instanceof Error)
            {
                toast.error("Failed to send message, please try again later.")
                console.error(e.message)
            }
        }
    }

    return (
        <Card className="max-w-3xl w-full mx-auto">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="m-4">
                                <div className="mb-5 mt-1">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render=
                                        {
                                            ({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }
                                    />
                                </div>

                                <div className="mb-5 mt-1">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render=
                                        {
                                            ({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="name@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }
                                    />
                                </div>

                                <div className="mb-5 mt-1">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render=
                                        {
                                            ({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="073 123 4567" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }
                                    />
                                </div>

                                <div className="mb-5 mt-1">
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render=
                                        {
                                            ({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Message</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Tell us how we can help you" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }
                                    />
                                </div>

                                <div className="mb-5 mt-1 flex justify-center md:justify-start">
                                    <Button
                                        type="submit"
                                        disabled={status === "sending" || status === "sent"}
                                        className="w-full md:w-auto"
                                    >
                                        {status === "idle" && "Send"}
                                        {status === "sending" && "Sending"}
                                        {status === "sent" && "Sent"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>

                <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                    <QRCodeCanvas
                        className="border-2 border-border rounded-lg w-3/4 max-w-xs"
                        fgColor="oklch(0.2864 0.0049 44.33)"
                        bgColor="oklch(0.9724 0.0059 59.65)"
                        value="https://wa.me/27609524595"
                        size={256}
                    />

                    <p className="text-sm md:text-base mt-2 text-center">
                        <a
                            href="https://wa.me/27609524595"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-primary transition-colors"
                        >
                            WA: +27 60 952 4595
                        </a>
                        {" | "}
                        <a
                            href="mailto:contact@mlith.co.za"
                            className="underline hover:text-primary transition-colors"
                        >
                            contact@mlith.co.za
                        </a>
                    </p>
                </div>
            </div>
        </Card>
    )
}
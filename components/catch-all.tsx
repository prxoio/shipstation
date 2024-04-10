// Adjust your imports as necessary
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

// Define a type for your component's props
interface SwitchFormProps {
  onSwitchChange: (isEnabled: boolean) => void // Prop to pass the switch state to the parent component
}

const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
})

export function SwitchForm({ onSwitchChange }: SwitchFormProps) {
  const [isSwitchOn, setIsSwitchOn] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      marketing_emails: isSwitchOn,
    },
  })

  return (
    <Form {...form} onSubmit={form.handleSubmit((data) => console.log(data))}>
      <div className='w-full space-y-6'>
        <FormField
          control={form.control}
          name='marketing_emails'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Catch All Mode</FormLabel>
                <FormDescription>Accept all orders from this shop</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    setIsSwitchOn(checked)
                    field.onChange(checked)
                    onSwitchChange(checked)
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

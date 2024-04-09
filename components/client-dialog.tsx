import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2'
import siteconfig from '@/siteconfig.json'

interface ClientDialogProps {
  name: string
  url: string
  uid: string
  clientId: string
}

const ClientDialog: React.FC<ClientDialogProps> = ({ name, url, uid, clientId }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Activate</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[650px]'>
        <DialogHeader>
          <DialogTitle>Activate Webhook</DialogTitle>
          <DialogDescription>
            To Activate the webhook for <strong>{name}</strong> please copy the URL
            below. Click the URL to copy it to your clipboard.
          </DialogDescription>
        </DialogHeader>

        <div className='mt-4'>
          <Label htmlFor='url'>Copy your webhook URL</Label>
          <Input
            id='url'
            className='mt-1'
            readOnly
            value={`${siteconfig.hostUrl}api/orderhook?${clientId}`}
          />
        </div>
        <div className='mt-4'>
          <Label htmlFor='url'>Navigate to your store using this URL</Label>
          <Input
            id='url'
            className='mt-1'
            readOnly
            value={`https://${url}/store/manufi/settings/notifications/webhooks`}
          />
        </div>
        <DialogDescription>
          Click <strong>Create Webhook</strong> and paste the Webhook URL above into
          the URL field. The webhook should be configured as follows:
          <br />
          <br />
          Event: Order Creation <br />
          Format: JSON <br />
          URL: {`${siteconfig.hostUrl}api/orderhook?${clientId}`} <br />
          API Version: 2024-04
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
export default ClientDialog

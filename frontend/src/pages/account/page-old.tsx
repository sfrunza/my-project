import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TruckIcon } from 'lucide-react';
import UserCard from './user-card';

function AccountPage() {
  const data = [];
  return (
    <div className="p-4 min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <UserCard />
        </div>
        <Card className="w-full flex-1 overflow-hidden">
          <CardHeader>
            <CardTitle>Moves History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Current moves</TabsTrigger>
                <TabsTrigger value="password">Past moves</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Table className="min-w-[950px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">#</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead className="text-right">Update</TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
                <NotFound />
              </TabsContent>
              <TabsContent value="password">
                <Table className="min-w-[950px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">#</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead className="text-right">Update</TableHead>
                    </TableRow>
                  </TableHeader>
                  {/* <TableBody>
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        No moves found.
                      </TableCell>
                    </TableRow>
                  </TableBody> */}
                </Table>
                {data.length === 0 && <NotFound />}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="h-96 flex flex-col items-center justify-center gap-4">
      <TruckIcon className="size-24 stroke-1 text-muted-foreground" />
      <p className="text font-medium">No moves found.</p>
    </div>
  );
}

export const Component = AccountPage;

// function Test() {
//   return (
//     <Card className="overflow-hidden">
//       <CardHeader className="flex flex-row items-start bg-muted/50">
//         <div className="grid gap-0.5">
//           <CardTitle className="group flex items-center gap-2 text-lg">
//             Order Oe31b70H
//             <Button
//               size="icon"
//               variant="outline"
//               className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
//             >
//               <Copy className="h-3 w-3" />
//               <span className="sr-only">Copy Order ID</span>
//             </Button>
//           </CardTitle>
//           <CardDescription>Date: November 23, 2023</CardDescription>
//         </div>
//         <div className="ml-auto flex items-center gap-1">
//           <Button size="sm" variant="outline" className="h-8 gap-1">
//             <Truck className="h-3.5 w-3.5" />
//             <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
//               Track Order
//             </span>
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button size="icon" variant="outline" className="h-8 w-8">
//                 <MoreVertical className="h-3.5 w-3.5" />
//                 <span className="sr-only">More</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem>Edit</DropdownMenuItem>
//               <DropdownMenuItem>Export</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Trash</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </CardHeader>
//       <CardContent className="p-6 text-sm">
//         <div className="grid gap-3">
//           <div className="font-semibold">Order Details</div>
//           <ul className="grid gap-3">
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">
//                 Glimmer Lamps x <span>2</span>
//               </span>
//               <span>$250.00</span>
//             </li>
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">
//                 Aqua Filters x <span>1</span>
//               </span>
//               <span>$49.00</span>
//             </li>
//           </ul>
//           <Separator className="my-2" />
//           <ul className="grid gap-3">
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">Subtotal</span>
//               <span>$299.00</span>
//             </li>
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">Shipping</span>
//               <span>$5.00</span>
//             </li>
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">Tax</span>
//               <span>$25.00</span>
//             </li>
//             <li className="flex items-center justify-between font-semibold">
//               <span className="text-muted-foreground">Total</span>
//               <span>$329.00</span>
//             </li>
//           </ul>
//         </div>
//         <Separator className="my-4" />
//         <div className="grid grid-cols-2 gap-4">
//           <div className="grid gap-3">
//             <div className="font-semibold">Shipping Information</div>
//             <address className="grid gap-0.5 not-italic text-muted-foreground">
//               <span>Liam Johnson</span>
//               <span>1234 Main St.</span>
//               <span>Anytown, CA 12345</span>
//             </address>
//           </div>
//           <div className="grid auto-rows-max gap-3">
//             <div className="font-semibold">Billing Information</div>
//             <div className="text-muted-foreground">
//               Same as shipping address
//             </div>
//           </div>
//         </div>
//         <Separator className="my-4" />
//         <div className="grid gap-3">
//           <div className="font-semibold">Customer Information</div>
//           <dl className="grid gap-3">
//             <div className="flex items-center justify-between">
//               <dt className="text-muted-foreground">Customer</dt>
//               <dd>Liam Johnson</dd>
//             </div>
//             <div className="flex items-center justify-between">
//               <dt className="text-muted-foreground">Email</dt>
//               <dd>
//                 <a href="mailto:">liam@acme.com</a>
//               </dd>
//             </div>
//             <div className="flex items-center justify-between">
//               <dt className="text-muted-foreground">Phone</dt>
//               <dd>
//                 <a href="tel:">+1 234 567 890</a>
//               </dd>
//             </div>
//           </dl>
//         </div>
//         <Separator className="my-4" />
//         <div className="grid gap-3">
//           <div className="font-semibold">Payment Information</div>
//           <dl className="grid gap-3">
//             <div className="flex items-center justify-between">
//               <dt className="flex items-center gap-1 text-muted-foreground">
//                 <CreditCard className="h-4 w-4" />
//                 Visa
//               </dt>
//               <dd>**** **** **** 4532</dd>
//             </div>
//           </dl>
//         </div>
//       </CardContent>
//       <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
//         <div className="text-xs text-muted-foreground">
//           Updated <time dateTime="2023-11-23">November 23, 2023</time>
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

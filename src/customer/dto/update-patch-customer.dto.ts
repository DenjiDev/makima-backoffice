import { CreateCustomerDto } from "./create-customer.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePatchCustomerDto extends PartialType(CreateCustomerDto) {

}

import { SchemaDirectiveVisitor } from "apollo-server";

export class RestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { name } = this.args;
    field.resolve = (_, args, { dataSources }) =>
      dataSources.spotify[name](args);
  }
}

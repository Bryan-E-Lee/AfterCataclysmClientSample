import { OwnedContainerInitializer } from "../ItemInitializers";
import { Container } from "./Container";

export class ContainerFactory {
    public static Create(initializer: OwnedContainerInitializer): Container {
        return new Container(initializer);
    }
}
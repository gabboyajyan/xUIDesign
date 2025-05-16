'use client'

import { ButtonComponent } from "@/xUiDesign/components/Button"
import { Button as AntButton, Flex } from "antd"

export default function Home() {
    return (
        <div style={{ display: 'flex', gap: '100px' }}>
            <div>
                <h2>xUiDesign Button</h2>
                <Flex gap="small" align="flex-start" vertical>
                    <Flex gap="small">
                        <ButtonComponent type="primary">Primary</ButtonComponent>
                        <ButtonComponent type="primary" disabled>
                            Primary(disabled)
                        </ButtonComponent>
                    </Flex>
                    <Flex gap="small">
                        <ButtonComponent>Default</ButtonComponent>
                        <ButtonComponent disabled>Default(disabled)</ButtonComponent>
                    </Flex>
                    <Flex gap="small">
                        <ButtonComponent type="dashed">Dashed</ButtonComponent>
                        <ButtonComponent type="dashed" disabled>
                            Dashed(disabled)
                        </ButtonComponent>
                    </Flex>
                    <Flex gap="small">
                        <ButtonComponent type="text">Text</ButtonComponent>
                        <ButtonComponent type="text" disabled>
                            Text(disabled)
                        </ButtonComponent>
                    </Flex>
                    <Flex gap="small">
                        <ButtonComponent href="https://vran.am" type="link">Link</ButtonComponent>
                        <ButtonComponent href="https://vran.am" type="link" disabled>
                            Link(disabled)
                        </ButtonComponent>
                    </Flex>
                    <Flex gap="small">
                        <ButtonComponent type="primary" href="https://ant.design/index-cn">
                            Href Primary
                        </ButtonComponent>
                        <ButtonComponent type="primary" href="https://ant.design/index-cn" disabled>
                            Href Primary(disabled)
                        </ButtonComponent>
                    </Flex>
                    <Flex gap="small">
                        <ButtonComponent danger>Danger Default</ButtonComponent>
                        <ButtonComponent danger disabled>
                            Danger Default(disabled)
                        </ButtonComponent>
                    </Flex>
                    <Flex gap="small">
                        <ButtonComponent danger type="text">
                            Danger Text
                        </ButtonComponent>
                        <ButtonComponent danger type="text" disabled>
                            Danger Text(disabled)
                        </ButtonComponent>
                    </Flex>
                    <Flex gap="small">
                        <ButtonComponent href="https://vran.am" type="link" danger>
                            Danger Link
                        </ButtonComponent>
                        <ButtonComponent href="https://vran.am" type="link" danger disabled>
                            Danger Link(disabled)
                        </ButtonComponent>
                    </Flex>
                    <Flex gap="small" className="site-button-ghost-wrapper">
                        <ButtonComponent ghost>Ghost</ButtonComponent>
                        <ButtonComponent ghost disabled>
                            Ghost(disabled)
                        </ButtonComponent>
                    </Flex>
                </Flex>
            </div>

            <div>
                <h2>Ant Design Button</h2>
                <Flex gap="small" align="flex-start" vertical>
                    <Flex gap="small">
                        <AntButton type="primary">Primary</AntButton>
                        <AntButton type="primary" disabled>
                            Primary(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton>Default</AntButton>
                        <AntButton disabled>Default(disabled)</AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton type="dashed">Dashed</AntButton>
                        <AntButton type="dashed" disabled>
                            Dashed(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton type="text">Text</AntButton>
                        <AntButton type="text" disabled>
                            Text(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton href="https://vran.am" type="link">Link</AntButton>
                        <AntButton href="https://vran.am" type="link" disabled>
                            Link(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton type="primary" href="https://ant.design/index-cn">
                            Href Primary
                        </AntButton>
                        <AntButton type="primary" href="https://ant.design/index-cn" disabled>
                            Href Primary(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton danger>Danger Default</AntButton>
                        <AntButton danger disabled>
                            Danger Default(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton danger type="text">
                            Danger Text
                        </AntButton>
                        <AntButton danger type="text" disabled>
                            Danger Text(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small">
                        <AntButton href="https://vran.am" type="link" danger>
                            Danger Link
                        </AntButton>
                        <AntButton href="https://vran.am" type="link" danger disabled>
                            Danger Link(disabled)
                        </AntButton>
                    </Flex>
                    <Flex gap="small" className="site-Antbutton-ghost-wrapper">
                        <AntButton ghost>Ghost</AntButton>
                        <AntButton ghost disabled>
                            Ghost(disabled)
                        </AntButton>
                    </Flex>
                </Flex>
            </div>
        </div>
    )
}
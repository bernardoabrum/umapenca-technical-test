<template>
  <div class="view cart-view">
    <div class="container-left">
      <h1>Finalização do pedido</h1>
      <form>
        <div class="contact">
          <h2>Informações de contato</h2>
          <label>
            Email
            <Input input-name="email" placeholder="seuemail@exemplo.com.br" />
          </label>
          <label>
            Telefone
            <Input input-name="phone" placeholder="(00) 00000-0000" />
          </label>
        </div>
        <div class="delivery">
          <h2>Informações de entrega</h2>
          <label>
            CEP
            <Input input-name="cep" placeholder="00000-000" />
          </label>
          <label>
            Rua
            <Input input-name="street" placeholder="Nome da rua" />
          </label>
          <label>
            Cidade
            <Input input-name="city" placeholder="Cidade" />
          </label>
          <label>
            Bairro
            <Input input-name="neighborhood" placeholder="Bairro" />
          </label>
          <label>
            Estado
            <Input input-name="state" placeholder="Estado" />
          </label>
        </div>
        <div class="payment">
          <h2>Informações de pagamento</h2>
          <label>
            Número do cartão
            <Input input-name="cardNumber" placeholder="0000 0000 0000 0000" />
          </label>
          <label>
            Titular do cartão
            <Input input-name="cardHolder" placeholder="Nome completo" />
          </label>
          <label>
            Data de validade
            <Input input-name="cardExpiration" placeholder="MM/AA" />
          </label>
          <label>
            CVC
            <Input input-name="cardCVC" placeholder="000" />
          </label>
        </div>
        <div class="finish-button">
          <button type="submit">Fechar pedido</button>
        </div>
      </form>
    </div>
    <div class="container-right">
      <div class="bag-container">
        <h2>Sua sacola</h2>
        <div class="product-container">
          <div class="product" v-for="item in items" :key="item.id">
            <div class="image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="description">
              <div>
                <p>{{ item.title }}</p>
                <p>R$ {{ item.price }}</p>
              </div>
              <div class="quantity">
                <p>Quantidade</p>
                <div class="setter">
                  <button
                    @click="setQuantity({ id: item.id, action: 'decrease' })"
                  >
                    -
                  </button>
                  <p>{{ item.quantity }}</p>
                  <button
                    @click="setQuantity({ id: item.id, action: 'increase' })"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>Total: R$ {{ totalValue }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import "./CartView.less";
import { Input } from "@/components";
import { useStore } from "@/store";
import { computed } from "vue";

const { getShoppingCart, setQuantity } = useStore();
const items = computed(() => getShoppingCart());

const totalValue = computed(() => {
  return items.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});
</script>

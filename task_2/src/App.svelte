<script lang="ts">
  let selectedCurrencyFrom = "USD";
  let selectedCurrencyTo = "EUR";
  let amount = 1;
  let exchangeRate = 0;

  function handleChange(
    this: {
      id: string;
      name: string;
      "bind:value": string | number;
      "on:change"?: (event: Event) => void;
      type?: "number";
      "on:input"?: (event: Event) => void;
    },
    event: Event
  ) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    if (
      name === "selectedCurrencyFrom" ||
      name === "selectedCurrencyTo" ||
      name === "amount"
    ) {
      (this as any)[name] = value;
      calculateConversion();
    }
  }

  async function calculateConversion() {
    const url = `https://api.exchangerate-api.com/v4/latest/${selectedCurrencyFrom}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      exchangeRate = data.rates[selectedCurrencyTo];
    } catch (error) {
      console.error("Ошибка:", (error as Error).message);
      exchangeRate = 0;
    }
  }
</script>

<main>
  <h1>Конвертер валют</h1>
  <div>
    <label for="currencyFrom">Из валюты:</label>
    <select
      id="currencyFrom"
      name="selectedCurrencyFrom"
      bind:value={selectedCurrencyFrom}
      on:change={handleChange}
    >
      <option value="USD">USD (Доллар США)</option>
      <option value="EUR">EUR (Евро)</option>
      <option value="RUB">RUB (Российский рубль)</option>
      <option value="GBP">GBP (Британский фунт)</option>
    </select>
  </div>
  <div>
    <label for="currencyTo">В валюту:</label>
    <select
      id="currencyTo"
      name="selectedCurrencyTo"
      bind:value={selectedCurrencyTo}
      on:change={handleChange}
    >
      <option value="USD">USD (Доллар США)</option>
      <option value="EUR">EUR (Евро)</option>
      <option value="RUB">RUB (Российский рубль)</option>
      <option value="GBP">GBP (Британский фунт)</option>
    </select>
  </div>
  <div>
    <label for="amount">Сумма:</label>
    <input
      type="number"
      id="amount"
      name="amount"
      bind:value={amount}
      on:input={handleChange}
    />
  </div>
  <div>
    <p>Результат конверсии: {amount * exchangeRate} {selectedCurrencyTo}</p>
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>

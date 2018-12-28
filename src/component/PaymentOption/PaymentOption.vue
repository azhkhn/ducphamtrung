<style lang="scss">
@import './PaymentOption.scss';</style>
<script src="./PaymentOption.js"></script>

<template id="payment">
	<div>
		   <div class="paragram">
                                <h4>Payment Options</h4>
                                <br>
                                <p>
									Choose from one of our quick and convenient payment options, and our team will ensure that the whole procedure is undertaken in the safest manner possible.
Credit card
Bank guarantee
Internet Banking
Cash deposit
Bank transfer
								</p>
            </div>
			 <div class="paragram">
                                <h4>We also offer following payment choices for our clients</h4>
                                <br>
                                <p>
									<b>Floating Cash Deposit:</b> This requires clients to maintain a certain amount of money as floating deposit, as agreed by both parties. As soon as the client makes a reservation, this is deducted from the deposit amount. But reserva -
tions will not be allowed or even cancelled, if the deposit fund is low or insufficient.
<b>Credit Line:</b> Clients can secure a confirmed booking of tours and services with an established credit line. In order to be assigned with a credit line, it’s vital for the clients to abide by the provisions and standards set by BedLinker,
besides maintaining a floating deposit or a bank guarantee from a reputable financial institution.
BedLinker provides a comprehensive suite of travel solutions at a very competitive rate and without any hidden fee / string attached. We also assure our members of excellent technical support and immediate response to their
queries with the best of our knowledge.
								</p>
            </div>

		<b-table  outlined striped hover :items="items"></b-table>

	</div>
</template>


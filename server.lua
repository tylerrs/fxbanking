QBCore = nil
TriggerEvent('QBCore:GetObject', function(obj) QBCore = obj end)

RegisterServerEvent("fxbanking:doQuickDeposit")
AddEventHandler("fxbanking:doQuickDeposit", function(amount)
    local src = source
    local xPlayer = QBCore.Functions.GetPlayer(src)
    local curBank = xPlayer.PlayerData.money["cash"]
    while xPlayer == nil do Wait(0) end
    if tonumber(amount) <= curBank then
        xPlayer.Functions.RemoveMoney('cash', tonumber(amount))
        xPlayer.Functions.AddMoney('bank', tonumber(amount))
        TriggerClientEvent("fxbanking:refreshBank", src)
        TriggerClientEvent("QBCore:Notify", src, "You made a cash deposit of $ " .. amount .. " successfully.", "success")
    else
        TriggerClientEvent("QBCore:Notify", src, "You don't have that amount on your cash wallet.", "error")
    end
end)

RegisterServerEvent("fxbanking:doQuickWithdraw")
AddEventHandler("fxbanking:doQuickWithdraw", function(amount)
    local src = source
    local xPlayer = QBCore.Functions.GetPlayer(src)
    local curBank = xPlayer.PlayerData.accounts["bank"]
    while xPlayer == nil do Wait(0) end
    if tonumber(amount) <= curBank then
        xPlayer.Functions.RemoveMoney('bank', tonumber(amount))
        xPlayer.Functions.AddMoney('cash', tonumber(amount))
        TriggerClientEvent("fxbanking:refreshBank", src)
        TriggerClientEvent("QBCore:Notify", src, "You made a cash withdrawl of $ " .. amount .. " successfully.", "success")
    else
        TriggerClientEvent("QBCore:Notify", src, "You don't have that amount on your bank wallet.", "error")
    end
end)
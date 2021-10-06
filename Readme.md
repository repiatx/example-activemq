# ActiveMQ Demo

## Setup

1. Docker kurulumu

    ```bash
    cd docker
    docker-compose up
    ```

2. Consumer kaldırılması

    ```bash
    node consumer.js
    ```

3. Publisher kaldırılması

    ```bash
    node publisher.js
    ```

Vuala **consumer.js** konsolundan **publisher.js** ile göndermiş olduğunuz mesajı görebilirsiniz

## FAQ

1. ActiveMQ Port already in use diyebilir

    Bunun için sırasıyla.

    ```bash
    netsh interface ipv4 show excludedportrange protocol=tcp
    ```

    TCP protokülünün rezerve edilen portlarını görüyoruz.

    **CMD** yada **PowerShell** yönetici olarak çalıştırıyoruz.

    ```bash
    net stop winnat
    netsh interface ipv4 set dynamic tcp start=61518 num=1000
    net start winnat
    ```

    diyerek işlemi bitiriyoruz.

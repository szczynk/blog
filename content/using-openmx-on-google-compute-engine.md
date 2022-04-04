---
title: "Using OpenMX on Google Compute Engine"
subtitle: "Because I have a potato laptop and understand a little about Compute Engine."
lead: "Because I have a potato laptop, don't have money to upgrade workspace, want to graduate fast, and understand a little about Compute Engine."
description: "because I have a potato laptop, don't have money to upgrade workspace, want to graduate quickly, understand a little about Compute Engine, and GCP is very good at providing services with free trial Rp 4,276,801.00 for 3 months on credit also enjoy access to 20+ select products, such as Compute Engine, are free."
cover:
  image: 'using-openmx-on-google-compute-engine.png'
  thumb: 'using-openmx-on-google-compute-engine.png'
  alt: 'Using OpenMX on Google Compute Engine cover image'
  caption: 'Edited Photo by Me'
createdAt: 2022-03-11T09:42:00Z
updatedAt: 2022-04-04T21:26:40Z
tags:
  - tech
  - openMX
  - google cloud platform
  - compute Engine
---

## Introduction

[OpenMX (Open source package for Materials eXplorer)](http://www.openmx-square.org/) is a software package for nanoscale material simulation based on density function theory (DFT), norm-preserving pseudopotential, and pseudo-atomic localized base functions. OpenMX is the tool I used when I was working on my undergraduate thesis on the electrical and magnetic properties of a monolayer NiBr2 based on density function theory (DFT) but it is very heavy on my [Asus K45DR](https://www.notebook-driver.com/asus-k45dr-notebook-tech-specifications/) laptop on [Ubuntu 20.04 LTS](https://releases.ubuntu.com/20.04/).

The minimum number of cores used by OpenMX is 4 using [OpenMPI](https://www.open-mpi.org/doc/v4.0/man1/mpirun.1.php) parallelization to make it faster, even though the minimum specification requirements are met, in fact this is not the case, on my laptop the required SCF calculation is 6 hours to 1 week for 1 configuration file input if it converges. This is very inefficient for the results of the initial research or initial discussion.

Based on my experience of implementing a web server on [Google Compute Engine](https://cloud.google.com/compute), I ended up using Google Compute Engine as my potato laptop alternative for SCF calculations with OpenMX. Enough with my complaints, let's apply it.

## Create a fresh Google Account with Debit or Credit Card

it's a Google service, you must have a Google account, if not, ask Google [how to create a Google account](https://www.google.com/search?q=how+to+create+a+Google+account).

If you don't have a debit or credit card, you'll need to create one first. In my case, I used the [Jenius](https://www.jenius.com/) debit card service. Jenius debit card service registration can be done on your smartphone, online, easy and practical.

Then go to [GCP free trial page](https://console.cloud.google.com/freetrial/) and fill in what is required.

## Create a Ubuntu VM instance

Forgive me, I forgot the first time I logged in Google console, I just followed the popup prompts and suddenly my project name is **My First Project**. Let's move on.

1. Let's go to the home page or dashboard or this [link](https://console.cloud.google.com/home/dashboard)
2. Click the **navigation menu** button at the very top left <DynamicImg filename="2022-03-10-19-31-console.cloud.google.com-nav-button.png" class="inline-block"/>
3. Look for the **Compute Engine** button and hover over the VM instances button
4. Click the **VM instances** button or this [link](https://console.cloud.google.com/compute/instances)
5. Click the **Create Instance** button or this [link](https://console.cloud.google.com/compute/instancesAdd)
6. Specify **Name** for your VM, for example **openmx**
7. Optional : Change the **Zone** for this VM. Compute Engine randomizes the list of zones within each region to encourage use across multiple zones. Otherwise, use default value which is **us-central1 (Iowa)**
8. Select **Configure machine** for your VM. For maximum efficiency in SCF calculation :

    a. Select **Compute-Optimized**

    b. Select **C2** or **C2D** series

    c. Select **c2-standard-8** or **c2d-standard-8** machine type (8 vCPU equals 4 cores)

9. Enable **display device**
10. In the Boot disk section, click **Change**, and then do the following :

    a. On the **Public images** tab, choose the following :

      - Operating System : **Ubuntu**

      - OS version : **Ubuntu 20.04 LTS**

      - Boot disk type : **Balanced Persistent Disk**

      - Boot disk size : **10 GB**

    b. To confirm your boot disk options, click **Select**.

11. To create and start the VM, click **Create**.

It takes a few moments to create your instance.

Congratulations you have created and started a VM instance.

><NoteBlockquote></NoteBlockquote>
>
> - the maximum default for all types of Compute Engine vCPUs [quotas](https://console.cloud.google.com/iam-admin/quotas?project=&pageState=(%22allQuotasTable%22:(%22f%22:%22%255B%257B_22k_22_3A_22Service_22_2C_22t_22_3A10_2C_22v_22_3A_22_5C_22Compute%2520Engine%2520API_5C_22_22_2C_22s_22_3Atrue_2C_22i_22_3A_22serviceTitle_22%257D_2C%257B_22k_22_3A_22Limit_22_2C_22t_22_3A2_2C_22v_22_3A_22%257B_5C_22v_5C_22_3A_5C_228_5C_22_2C_5C_22o_5C_22_3A_5C_22%253D_5C_22%257D_22_2C_22i_22_3A_22effectiveLimit_22%257D_2C%257B_22k_22_3A_22Dimensions%2520%2528e.g.%2520location%2529_22_2C_22t_22_3A10_2C_22v_22_3A_22_5C_22region_3Aus-central1_5C_22_22_2C_22s_22_3Atrue_2C_22i_22_3A_22displayDimensions_22%257D%255D%22))) for each region is **8 vCPUs** running at the same time.
> - **You can't request a quota increase**. For an overview of Compute Engine quotas, see [Resource quotas](https://cloud.google.com/compute/quotas).
>You must **upgrade your account** to perform any of the actions in the preceding list.
>
>The [free trial ends](https://cloud.google.com/free/docs/gcp-free-tier#end) when you use **all of your credit, or after 3 months**, whichever happens first. At that time, the following conditions apply:
>
> - You must [upgrade to a paid account](https://cloud.google.com/free/docs/gcp-free-tier#how-to-upgrade) to continue using Google Cloud. (**recommended upgrade before free trial ends**)
> - All resources you created during the trial are stopped.
> - **Any data you stored in Compute Engine is lost**.
> - Your account enters a 30-day grace period, during which you can **recover or export manually** any resources and data you stored in any Google Cloud services during the trial period.
> - You might receive a message stating that your account has been canceled, which only indicates that your account has been suspended to prevent charges.
>
>Lots of notes huh? I'm sorry, I'm afraid your calculations and data are lost

### Optional : Adding and formating a non-boot disk to your VM

when the boot disk starts to full, you can add a non-boot disk to your VM

1. Go to the [VM instances](https://console.cloud.google.com/compute/instances) page.
2. Check the box and click the name of the instance where you want to add a disk.
3. On the **VM instance details** page, click **Edit**.
4. Under **Additional disks**, click **Add new disk**.
5. Specify a name for the disk, configure the disk's properties, and select **Blank** as the **Source type**.
6. Click **Done** to complete the disk's configuration.
7. Click **Save** to apply your changes to the instance and add the new disk.
8. Click the **SSH** button next to the instance that has the new attached disk. The browser opens a terminal connection to the VM.
9. In the terminal, use the `lsblk` command to list the disks that are attached to your instance and find the disk that you want to format and mount.

    ```shell
    sudo lsblk

    sda       8:0    0    10G  0 disk 
    ├─sda1    8:1    0   9.9G  0 part /
    ├─sda14   8:14   0     4M  0 part 
    └─sda15   8:15   0   106M  0 part /boot/efi
    sdb       8:16   0    10G  0 disk 
    ```

    In this example, sdb is the device name for the new blank persistent disk.

10. Format the disk using the [`mkfs` tool](http://manpages.ubuntu.com/manpages/xenial/man8/mkfs.8.html). This command **deletes** all data from the specified disk, so make sure that you specify the disk device correctly.

    ```shell
    sudo mkfs.ext4 -m 0 -E lazy_itable_init=0,lazy_journal_init=0,discard /dev/sdb
    ```

11. Create a directory that serves as the mount point for the new disk on the VM. You can use any directory. The following example creates a directory under `/mnt/disks/`.

    ```shell
    sudo mkdir -p /mnt/disks/openmx
    ```

12. Use the [`mount` tool](http://manpages.ubuntu.com/manpages/xenial/man8/mount.8.html) to mount the disk to the instance, and enable the `discard` option:

    ```shell
    sudo mount -o discard,defaults /dev/sdb /mnt/disks/openmx
    ```

    ><NoteBlockquote></NoteBlockquote>
    >You can mount /dev/sdb to any directory you want.

13. Configure read and write permissions on the disk. For this example, grant write access to the disk for all users.

    ```shell
    sudo chmod a+w /mnt/disks/openmx
    ```

14. Configuring automatic mounting on VM restart by Add the disk to your `/etc/fstab` file, so that the disk automatically mounts again when the VM restarts. On Linux operating systems, the device name can change with each reboot, but the device UUID always points to the same volume, even when you move disks between systems.

    Create a backup of your current `/etc/fstab` file.

    ```shell
    sudo cp /etc/fstab /etc/fstab.backup
    ```

15. Use the `blkid` command to list the UUID for the disk.

    ```shell
    sudo blkid /dev/sdb
    ```

    for example output of `blkid` command

    ```shell
    /dev/sdb: UUID="c76cb476-9438-42e4-a31a-2bf428a42043" TYPE="ext4"
    ```

16. Open the `/etc/fstab` file in a text editor and create an entry that includes the UUID.

    ```shell
    sudo nano /etc/fstab
    ```

    add this line after last line.

    ```shell
    UUID=UUID_VALUE /mnt/disks/openmx ext4 discard,defaults,nofail 0 2
    ```

    Replace the following:
        - UUID_VALUE: the UUID of the disk, listed in the output of the previous step

17. Use the `cat` command to verify that your `/etc/fstab` entries are correct:

    ```shell
    cat /etc/fstab
    ```

    for example output of `cat` command

    ```shell
    LABEL=cloudimg-rootfs /  ext4 defaults 0 1
    LABEL=UEFI /boot/efi vfat umask=0077 0 1
    UUID="c76cb476-9438-42e4-a31a-2bf428a42043" /mnt/disks/openmx ext4 discard,defaults,nofail 0 2
    ```

    If you detach this disk or create a snapshot from the boot disk for this VM, edit the /etc/fstab file and remove the entry for this disk. Even with MOUNT_OPTION set to nofail or nobootwait, keep the /etc/fstab file in sync with the devices that are attached to your VM and remove these entries before you create your boot disk snapshot or detach the disk.

## Setting up desktop environment on Compute Engine

In my humble opinion, life is hard without desktop environment so let's set up Chrome Remote Desktop

### Installing Chrome Remote Desktop and Xfce desktop enviroment on the VM instance

For remote connections over slower networks I recommended Xfce because it has minimal graphical elements and few animations.

1. After the instance has been created, connect to your **openmx** instance by clicking the **SSH** button in the instance list :

    &nbsp;<DynamicImg filename="2022-03-11-01-58-console.cloud.google.com-ssh-button.png" class="inline-block"/>

2. In the SSH window connected to your VM instance, update the package manager data and install wget :

    ```shell
    sudo apt update
    sudo apt install --assume-yes wget tasksel
    ```

3. Download and install the Debian Linux Chrome Remote Desktop installation package :

    ```shell
    wget https://dl.google.com/linux/direct/chrome-remote-desktop_current_amd64.deb
    sudo apt update
    sudo apt-get install --assume-yes ./chrome-remote-desktop_current_amd64.deb
    ```

4. In the SSH window connected to your VM instance, install the **Xfce** desktop environment and basic desktop components :

    ```shell
    sudo DEBIAN_FRONTEND=noninteractive \
    apt install --assume-yes xfce4 desktop-base dbus-x11 xscreensaver
    ```

5. Configure Chrome Remote Desktop to use Xfce by default :

    ```shell
    sudo bash -c 'echo "exec /etc/X11/Xsession /usr/bin/xfce4-session" > /etc/chrome-remote-desktop-session'
    ```

6. Disable the display manager service on your instance. There is no display connected to your instance, so the display manager service won't start.

    ```shell
    sudo systemctl disable lightdm.service
    ```

7. Optional: install the Chrome browser on your instance :

    ```shell
    wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
    sudo apt install --assume-yes ./google-chrome-stable_current_amd64.deb
    ```

8. Finish with GUI for File Compression and Mousepad text editor

    ```shell
    sudo apt update
    sudo apt install --assume-yes thunar-archive-plugin mousepad
    ```

### Configuring and starting the Chrome Remote Desktop service

To start the remote desktop server, you need to have an authorization key for the Google account that you want to use to connect to it :

1. On your local computer, using the Chrome browser, go to the Chrome Remote Desktop command line setup page :

    ```html
    https://remotedesktop.google.com/headless
    ```

2. If you're not already signed in, sign in with a Google Account. This is the account that will be used for authorizing remote access.
3. On the **Set up another computer** page, click **Begin**.
4. On the **Download and install Chrome Remote Desktop** page, click **Next**. **Do not download and click** Windows and Debian Linux link
5. Click **Authorize**.

    You need to allow Chrome Remote Desktop to access your account. If you approve, the page displays a command line for Debian Linux that looks like the following :

    ```shell
    DISPLAY= /opt/google/chrome-remote-desktop/start-host \
    --code="4/xxxxxxxxxxxxxxxxxxxxxxxx" \
    --redirect-url="https://remotedesktop.google.com/_/oauthredirect" \
    --name=$(hostname)
    ```

    You use this command to set up and start the Chrome Remote Desktop service on your VM instance, linking it with your Google Account using the authorization code.

    ><NoteBlockquote></NoteBlockquote>
    >The authorization code in the command line is valid for only a few minutes, and you can use it only once. Otherwise restart this step again. <br>
    >You can know your hostname by looking at your SSH like this `username@hostname`, if you name your VM instance **openmx** your hostname is `openmx` <br>

6. Copy the command to the SSH window that's connected to your instance, and then run the command.
7. When you're prompted, enter a **6-digit PIN**. This number will be used for additional authorization when you connect later.
    You might see errors like `No net_fetcher` or `Failed to read`. You can ignore these errors.

8. Verify that the service is running using the following command.

    ```shell
    sudo systemctl status chrome-remote-desktop@$USER
    ```

    If the service is running, you see output that includes the state `active` :

    ```shell
    chrome-remote-desktop.service - LSB: Chrome Remote Desktop service
    Loaded: loaded (/lib/systemd/system/chrome-remote-desktop@USER.service; enabled; vendor preset: enabled)
    Active: active (running) since DATE_TIME; ELAPSED_TIME
    ```

    To restart the service, use the following command in the SSH window :

    ```shell
    sudo systemctl restart chrome-remote-desktop@$USER
    ```

9. You can exit SSH window at this point by type `exit` or click the x button.

### Connecting to the VM instance

You can connect to the VM instance using the Chrome Remote Desktop web application.

1. On your local computer, go to the [Chrome Remote Desktop](https://remotedesktop.google.com/) web site.

2. Click **Access my computer**.

3. If you're not already signed in to Google, sign in with the same Google Account that you used to set up the Chrome Remote Desktop service.
    You see your VM instance **openmx** in the Remote Devices list.

4. Click the name of the remote desktop instance. if you name your VM instance **openmx**, click **openmx**
5. When you're prompted, enter the PIN that you created earlier, and then click the arrow button to connect.
    You are now connected to the desktop environment on your remote Compute Engine instance.

6. The first time you connect, you are prompted to set up the desktop panels. Click **Use Default Config** to get the standard taskbar at the top and the quick launch panel at the bottom.

### Optional : Improving the remote desktop experience

#### Install the Remote Desktop Chrome app

The Remote Desktop Chrome app gives a separate windowed experience and allows keyboard shortcuts that would normally be intercepted by Chrome to be used on the remote system.

If this app is not installed, do the following :

1. Open the **Session Options** panel using the button chevron_left that appears when you move the mouse to the side of the window.
2. In the **Install App** section, click **Begin**.
3. Click **Install**.
The remote desktop session reopens in its own application window.

Congrats, you have **Compute Engine** with **Xfce desktop Environment**

## Installing OpenMX on Google Compute Engine

### Before you begin

1. Connect to your **openmx** instance by clicking the **SSH** button in the instance list
2. In the SSH window connected to your VM instance or your terminal, update the package manager data and install build-essential and library package that openmx need to build

    ```shell
    sudo apt update
    sudo apt install --assume-yes build-essential gcc-7 gfortran-7 libfftw3-dev libopenmpi-dev liblapack-dev libblas-dev libscalapack-mpi-dev
    ```

    Do not close your SSH window yet
3. Download OpenMX version 3.9 with patch version 3.9.9

    ```shell
    wget http://t-ozaki.issp.u-tokyo.ac.jp/openmx3.9.tar.gz
    ```

    ```shell
    wget http://www.openmx-square.org/bugfixed/21Oct17/patch3.9.9.tar.gz
    ```

    now you close your SSH window

    ><NoteBlockquote></NoteBlockquote>
    >You need SSH window to get **sudo** command

4. Connect your VM instance using the Chrome Remote Desktop web application by clicking the name of the remote desktop instance for example **openmx**.

### Installing OpenMX on desktop enviroment

1. Click the **File Manager** :

    &nbsp;<DynamicImg filename="2022-03-11-14-08-chrome.remote.dekstop-file-manager.png" class="inline-block"/>

2. **Right click** and then click **Extract Here** on **openmx3.9.tar.gz**
3. **Right click** and then click **Cut** on **patch3.9.9.tar.gz**
4. Navigate to `openmx3.9 / source` folder and paste **patch3.9.9.tar.gz**
5. **Right click** and then click **Extract Here** on **patch3.9.9.tar.gz**
6. Click **Yes** or **Replace** to patch the source code
7. Find **kpoint.in** file and move to `openmx3.9 / work` folder
8. Go back to `openmx3.9 / source` folder and find **makefile** file
9. Edit **makefile** file by **Right click**, then click **Open With "Mousepad"** and Change line 8 to line 14 with this config

    ```text
    # MKLROOT = /opt/intel/mkl
    # CC = mpicc -O3 -xHOST -ip -no-prec-div -qopenmp -I/opt/intel/mkl/include/fftw
    CC = mpicc -O3 -fopenmp
    # FC = mpif90 -O3 -xHOST -ip -no-prec-div -qopenmp
    FC = mpif90 -O3 -fopenmp
    # LIB= -L${MKLROOT}/lib/intel64 -lmkl_scalapack_lp64 -lmkl_intel_lp64 -lmkl_intel_thread -lmkl_core -lmkl_blacs_openmpi_lp64 -lmpi_usempif08 -lmpi_usempi_ignore_tkr -lmpi_mpifh -liomp5 -lpthread -lm -ldl
    LIB= -L/usr/lib -L/usr/lib/x86_64-linux-gnu -llapack -lblas -lfftw3 -lmpi -lmpi_mpifh -lgfortran -lscalapack-openmpi
    ```

10. Open Terminal at blank space inside file manager by **Right click** and then click **Open Terminal Here**
11. Build openmx using the following command.

    ```shell
    make clean
    make all
    make install
    ```

    It takes a few moments to build openmx.
    You might see some errors. You can ignore these errors.

12. Finally grant executable permission on **openmx** :

    ```shell
    chmod +x openmx
    ```

### Optional : Building other supportive program on OpenMX source

1. Navigate to `openmx3.9 / source` folder
2. Open Terminal at blank space inside file manager by **Right click** and then click **Open Terminal Here**
3. Build other supportive program on OpenMX source

    Band Dispersion

    ```shell
    gcc bandgnu13.c -lm -o bandgnu13
    ```

    Density of States

    ```shell
    make DosMain
    ```

    Analysis of Spin Texture

    ```shell
    make kSpin
    ```

><TipsBlockquote></TipsBlockquote>
>
> - Read through the [OpenMX manual](http://www.openmx-square.org/openmx_man3.9/) for various details.
> - [OpenMX viewer](http://www.openmx-square.org/viewer/index.html) can help you choose certain parameters for the input file e.g., basis configuration. You may also consult this [reference table](http://www.openmx-square.org/openmx_man3.9/node27.html).
> - [SeeK-path](https://www.materialscloud.org/work/tools/seekpath) tool can help you build the k-path.
> - [VESTA](https://jp-minerals.org/vesta/en/) and [xcrysden](http://www.xcrysden.org/) tool can be used for the visualization.
> - The work directory under OpenMX installation contains lots of example files for your reference.
